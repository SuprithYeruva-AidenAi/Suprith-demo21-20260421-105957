// AUTO-SEEDED by Aiden HX preview pipeline.
// Sandpack iframe can't reach the BFF on localhost, so this module patches
// window.fetch to satisfy /api/uoi/data/* calls with deterministic seed data.
// At deploy time, push_to_github replaces this with the Jira-derived mock.
// Do not edit manually.

type Json = Record<string, any>;

const LATENCY_MS = 120;
const TRACE_ID = "preview-" + Math.random().toString(36).slice(2, 10);

const PRODUCTS = [
  { product_code: "TR01", product_name: "Travel" },
  { product_code: "HM01", product_name: "Home" },
  { product_code: "MO01", product_name: "Motor" },
  { product_code: "DH01", product_name: "Domestic Helper" },
];

function seedItems(productCode: string, productName: string, count: number): Json[] {
  const out: Json[] = [];
  for (let i = 1; i <= count; i++) {
    out.push({
      proposalNo: `${productCode}-2026-${String(1000 + i).padStart(5, "0")}`,
      policyNo: `${productCode}-POL-${String(5000 + i).padStart(6, "0")}`,
      productCode,
      productName,
      insuredName: ["Tan Wei Ming", "Lim Jia Hui", "Siti Aisyah", "Rajesh Kumar", "Chen Xiao"][i % 5],
      premium: Math.round((450 + i * 85.25) * 100) / 100,
      currency: "SGD",
      status: ["Active", "Pending", "Expired"][i % 3],
      effectiveDate: `2026-${String(((i - 1) % 12) + 1).padStart(2, "0")}-15`,
      expiryDate: `2027-${String(((i - 1) % 12) + 1).padStart(2, "0")}-14`,
    });
  }
  return out;
}

function buildDashboardSummary(): Json {
  return {
    products: PRODUCTS.map((p, idx) => ({
      product_code: p.product_code,
      product_name: p.product_name,
      total: 12 + idx * 7,
      items: seedItems(p.product_code, p.product_name, 3),
      error: null,
    })),
    generated_at: Math.floor(Date.now() / 1000),
    trace_id: TRACE_ID,
  };
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "X-Aiden-Mock": "preview" },
  });
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function handleUoi(url: URL, req: Request): Promise<Response> {
  const path = url.pathname.replace(/^.*\/api\/uoi\/data/, "");
  await sleep(LATENCY_MS);

  if (path === "/dashboard/summary" && req.method === "GET") {
    return jsonResponse(buildDashboardSummary());
  }

  if (path === "/queryProposal" && req.method === "POST") {
    const body: Json = await req.json().catch(() => ({}));
    const code: string = body?.productCode || "TR01";
    const name = PRODUCTS.find((p) => p.product_code === code)?.product_name || code;
    const pageSize = Math.max(1, Math.min(100, Number(body?.pageSize) || 20));
    const pageNum = Math.max(1, Number(body?.pageNum) || 1);
    const total = 47;
    const all = seedItems(code, name, total);
    const start = (pageNum - 1) * pageSize;
    return jsonResponse({
      total,
      pageNum,
      pageSize,
      items: all.slice(start, start + pageSize),
      trace_id: TRACE_ID,
    });
  }

  if (path === "/loadQuote" && req.method === "POST") {
    const body: Json = await req.json().catch(() => ({}));
    return jsonResponse({
      quoteId: body?.quoteId || "Q-0001",
      productCode: body?.productCode || "TR01",
      status: "Ready",
      premium: 480.5,
      currency: "SGD",
      lineItems: [
        { label: "Base premium", amount: 420.0 },
        { label: "GST", amount: 60.5 },
      ],
      trace_id: TRACE_ID,
    });
  }

  if (path === "/fetchOrderData" && req.method === "POST") {
    return jsonResponse({ order: null, policies: [], trace_id: TRACE_ID });
  }

  if (path === "/fetchMasterData" && req.method === "POST") {
    return jsonResponse({ options: [], trace_id: TRACE_ID });
  }

  if (path === "/printDocument" && req.method === "POST") {
    return jsonResponse({ documentUrl: "#", trace_id: TRACE_ID });
  }

  if (path.startsWith("/passthrough/")) {
    return jsonResponse({ ok: true, trace_id: TRACE_ID });
  }

  return jsonResponse({ error: "Not found in preview mock" }, 404);
}

const originalFetch = window.fetch.bind(window);
window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  try {
    const raw = typeof input === "string" ? input : (input as Request).url || String(input);
    let url: URL;
    try {
      url = new URL(raw, window.location.origin);
    } catch {
      return originalFetch(input as any, init);
    }
    if (url.pathname.includes("/api/uoi/data")) {
      const req = new Request(url.toString(), {
        method: init?.method || (typeof input !== "string" && (input as Request).method) || "GET",
        headers: init?.headers,
        body: init?.body,
      });
      return handleUoi(url, req);
    }
  } catch (e) {
    console.warn("[preview-mock] fetch passthrough after error:", e);
  }
  return originalFetch(input as any, init);
};

console.info("[preview-mock] UOI fetch patcher active — /api/uoi/data/* intercepted.");
export {};
