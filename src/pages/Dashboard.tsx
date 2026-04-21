import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Home,
  Shield,
  File,
  Settings,
  PanelLeft,
  HelpCircle,
  Bell,
  ChevronRight,
  Car,
  ArrowRight,
  ShieldCheck,
  User,
  ChevronLeft,
  ChevronUp
} from 'lucide-react'

type CardStatus = 'covered' | 'not-covered' | 'loading' | 'error'

interface PolicyCard {
  id: string
  title: string
  icon: React.ReactNode
  status: CardStatus
  policies?: Array<{ name: string; badge: string; badgeColor: string; policyNo: string }>
  notCoveredText?: string
  errorMessage?: string | null
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [loading, setLoading] = useState(true)
  const [cards, setCards] = useState<PolicyCard[]>([])
  const [showUserMenu, setShowUserMenu] = useState(false)

  const fetchDashboard = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setCards([
        {
          id: 'travel',
          title: 'Travel',
          icon: <Shield className="w-[24px] h-[24px] text-[#212121]" />,
          status: 'covered',
          policies: [
            { name: 'InsureTravel (Annual Trip)', badge: 'In Force', badgeColor: 'bg-green-100 text-green-700', policyNo: 'PNF320104124A23' },
            { name: 'UniTravel (Single Trip)', badge: 'Expired', badgeColor: 'bg-red-100 text-red-600', policyNo: 'PNF320104124A23' },
          ],
        },
        {
          id: 'home',
          title: 'Home',
          icon: <Home className="w-[24px] h-[24px] text-[#212121]" />,
          status: 'covered',
          policies: [
            { name: 'UniHome', badge: 'Renewal Due', badgeColor: 'bg-orange-100 text-orange-600', policyNo: 'PNF320104124A23' },
          ],
        },
        {
          id: 'motor',
          title: 'Motor',
          icon: <Car className="w-[24px] h-[24px] text-[#212121]" />,
          status: 'not-covered',
          notCoveredText: 'Protect your car from $X/year with your pre-filled details. Get quote here.',
        },
        {
          id: 'helper',
          title: 'Helper',
          icon: <User className="w-[24px] h-[24px] text-[#212121]" />,
          status: 'covered',
          policies: [
            { name: 'UniHelper', badge: 'In Force', badgeColor: 'bg-green-100 text-green-700', policyNo: 'PNF320104124A23' },
          ],
        },
        {
          id: 'hospitalisation',
          title: 'Hospitalisation Protection',
          icon: <Shield className="w-[24px] h-[24px] text-[#212121]" />,
          status: 'not-covered',
          notCoveredText: 'Cover day-to-day expenses when hospitalised from $X/year. Get quote here.',
        },
        {
          id: 'personal-accident',
          title: 'Personal Accident',
          icon: <User className="w-[24px] h-[24px] text-[#212121]" />,
          status: 'not-covered',
          notCoveredText: 'Get medical coverage for accidents from $X/year with your pre-filled details. Get quote here.',
        },
      ])
      setLoading(false)
    }, 1000)
  }

  useEffect(() => {
    fetchDashboard()
  }, [])

  const handleLogout = () => {
    setShowUserMenu(false)
    navigate('/login')
  }

  const navItems = [
    { label: 'Dashboard', icon: <Home className="w-[24px] h-[24px]" />, active: true },
    { label: 'Policies', icon: <Shield className="w-[24px] h-[24px]" />, active: false },
    { label: 'Claims', icon: <File className="w-[24px] h-[24px]" />, active: false },
    { label: 'Rewards', icon: <Settings className="w-[24px] h-[24px]" />, active: false },
  ]

  const rewards = [
    {
      img: 'https://s3-alpha-sig.figma.com/img/3ccc/e6dc/76312628f87fe4b2face85c5785f97c9?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=GhaZPejTzke73Bac0TcIa9Ka8QfE1svJkJKAmX9vBmxuxClyX5GI605d2rWLR02X70oJAWg~aalQBukfGG7TAupVf84tGtC8uA3mFFdtu~CpDDoZ5Mds6AJuHjxSvF-aAU2s7q9cTSrC7J-hZ9Lud0ik~M9Kpl7AGE1nll7LSB0tXKhuyDrgHoQ0POfuhs766Iv7Bf6dFmdIQXNB0fDua5xyOuI7jUYQu3LyrFBt8--0QBFEi9TMQpLiszMlxmo2MYx7TnEVa7aAalfEuO81Uc9UoOQDZuS3jxs1umlWslzCFI32G7Z5NDCj5UhTMnQSRhIxjPOtQ9S6PftVMJW03g__',
      logo: 'https://s3-alpha-sig.figma.com/img/86bf/5a50/b8f3a3749921a7a5868d0591a840460d?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=roDYZCuP6L95dqOCJWUcchZ3j2HP8gd~x9MbTBJCHBULbSAd3GRACaGNZVY5f2SBbAQ5~gPFsFBMqRfz~Wmpxl7Zza0ZpLgIX5D-zdEe1BVX7EPzQXCMs26Afyrz1A-k0-TDwjDGZZsfftsUINAIE~iOkoXjGMtgScU6xOOTHNW~JL6Ip4AgOGfElYKGOeHY--5sMXi6qw~KPrMS8JG~FYUqwiIZlSpEeul~A~FGVIiHHqBOi~ZO-i0OUtklAkZsjLb3iBV~NtHCeWGa6G4zy2x6cPzDyTRqHozLZSh05vQYxseV-o361MFESUfScUeQMPNGr5tIyjDkLY-BvqOaSA__',
      title: '10% off KITH by Casa Products',
      desc: 'Enter promo code UOIKITH10 at checkout on www.kith.sg to enjoy the offer.',
      btn: 'Shop Now',
    },
    {
      img: 'https://s3-alpha-sig.figma.com/img/85ca/0b3b/5576e86be97d861823edf673af1c11f8?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=a6Q-4PS8zNmSpAlOSoIJckd-Mt0qPamBFfQwVawVB17k1R2k9ZcuGq~PaW-ZT2ay39Qh8WjdKmxuuBYNPbv5lOgShBkXaAcv3ruXC9eMwKH9PX9v3fCc5~zoDXLOYJqxtDA5bhwtsvSPYkBzux3Zfy~SMuQp2xHuTup6mt6YBAU1v0fsvO~oTQz0m4ZSCJauehADpfMW1t~SGV9iRdMU9FyYMBzG6FSD0sQwyGelAAtRYF036ATKHMGRAGK-pCF1cZ51tzAsQ8QNn6bRnPHXXqc1inCVU4sS6iajgHw0dF1~ZtExq32bAJ-BvfBu3EMwZhHmbuih0NRGLGfmCXciyw__',
      logo: 'https://s3-alpha-sig.figma.com/img/0a97/bee0/ba771711c17f9b573620e9c39ee75371?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=AaIqBKwZJBxD-AYIr1D7d-Z-tU9A4QIBUyszzsTsVZizP~YcsLXaaYNg7RPa9KLFNbjlb6o1dlvRj4xnQvG8VIKpThOeQx1BpwcAA6dnnXi0Fy82kW4OkQPf4vdo8UU01vpg50tFd85zpcPGfYitrrXI7qRctA0f0cGceOhaYnBVVrLP2ALIEMUQ8otnv7v6hkXG7O~wtmP982yugkwlmjf0eSf155azufB4AmbUPrl8q1Jd6XRkHBCXFNmg03L7jtWSwFvpFl4gk2rNCoyQHU50~aWwtJmn0WqoGC-SyEjL6AMcU6FbN-OGFnwCFjfeKR76n2hGjcKMRC2-r0phng__',
      title: '10% off Cat & the Fiddle Cakes',
      desc: 'Enter promo code UOICATFIDDLE10 at checkout on www.catandthefiddle to enjoy the offer.',
      btn: 'Shop Now',
    },
    {
      img: 'https://s3-alpha-sig.figma.com/img/8287/f018/93dadb02e8922d16e90a39a645f04366?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FvBJcOyMPYJHiTC4X9l8Vkx13O3GdrJe7wpaabFamd~EcJzIoVR3jvqG2QnO98WXacHJpRnCEAR9wgS5aRkeBPplVEFH9F6t2AS56pHoZxV498Os0MDS0UrLQaG-4rGLR7p2LOOQ4EEXMvv09A6st8XqSQMUGZSuV1J8vH27mPhK6-udbegy~TWKGmOZ7VDiVZgGVt9isDg7u5LTihrUGxbcKtABoSkFE0CaO36TjvHaRRwbgMesxCzovYOA~~utbTHg1RZiBZqTUFxDDUgxybvkMNkYLCoH9~uQGrAS~8fPPx-ljm8iDmFwEdLR-L0rzG-u-lR9g0HBGraZdeAajA__',
      logo: 'https://s3-alpha-sig.figma.com/img/3aa6/8189/82dafd597dffb5e00a3a6d89d162beec?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=TOw1O9cQBy-MGUjIPJVPwkDsmgJIL4PN5crLB9WM5I73zJiYN1UpUItZE1A6iz9GEBi-E6tJjUDsrH4nAjaRlDbhKLQ7lENfpvExbfAW6nlRTMUyJscu5BqxVgmO1bSq1xhwnJqwxKZSWwKspmbPRjudGhOnEL3qq4YTvu9CygBP~P8nUDXRTFj2a0LBGNoig~VmfFFxZzTVpkgAP0SqKBi4cI-fKJQOspOmYGSqozxVqXI66MvEFy4~dbIoCUOV68OvGqYh4yoploGPlWvii7by00kY6JHa3c~PaAWEMihmm2S9InzyDdfq7y0~-zJqdGjbe-qHdeqW-Iq6-kRMEg__',
      title: '$5 Credit Reward for HEYMAX New User Sign Up ',
      desc: 'Enter promo code UOIHEYMAX5 during registration to enjoy $5 credit.',
      btn: 'Sign Up',
    },
  ]

  const SkeletonCard = () => (
    <div className="flex flex-col rounded-[8px] overflow-hidden shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] bg-[#ffffff] animate-pulse">
      <div className="h-[59px] bg-gray-200 border-b border-gray-100" />
      <div className="flex-1 p-[16px] flex flex-col gap-[12px]">
        <div className="h-[48px] bg-gray-100 rounded-[8px]" />
        <div className="h-[48px] bg-gray-100 rounded-[8px]" />
      </div>
    </div>
  )

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-row overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`h-full shrink-0 flex flex-col bg-[#ffffff] border-r border-[#000000] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] transition-all duration-300 overflow-y-auto ${
            sidebarOpen ? 'w-[240px]' : 'w-[72px]'
          }`}
        >
          <div className="flex flex-col gap-[24px] p-[24px_16px] flex-1">
            {/* Logo */}
            <div className="flex items-center gap-[10px]">
              {sidebarOpen && (
                <img src="https://s3-alpha-sig.figma.com/img/26ec/3ab4/0588c7482da725dcdeb68b2897f9bde2?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ShoM0pDLFtIglvPWeRLcrNHkP-8DajZ~UfTydATZnIyvxRx0Q8vNaKu-xBitsol0veqqwq1r4p1azXwhatXwj7sKArxvuNthVWmFirx22koohe8997mFNM6GF2P9FJZQ6hnguVRCcCTWizRFgiWWnqabTviIJl1EuaMxA65dwinn4u47OVQuKOW4HPfBJ49i-x-lqHrsAbGLy9XfBAQqpYzMCSsmnWFH-jgrpSRysU3HqoilRLqyQb6LtiIX7mix4qKeTiJI50ywXWQYf5zHXGyqc7Ry5JQaJUdS88v~1e1Kd-i6t7RipipnfhyJG71UbhW-m-9vh~8Pv9t2nKWPxg__" alt="UOI Logo" className="w-[100px] h-[51px] object-contain" />
              )}
            </div>

            {/* Nav items */}
            <nav className="flex flex-col gap-[12px]">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-[12px] px-[12px] py-[10px] rounded-[8px] cursor-pointer ${
                    item.active
                      ? 'bg-gradient-to-r from-[#005eb8]/10 to-[#5c55eb]/10 text-[#005eb8]'
                      : 'text-[#212121] hover:bg-gray-50'
                  }`}
                >
                  <span className={item.active ? 'text-[#005eb8]' : 'text-[#212121]'}>{item.icon}</span>
                  {sidebarOpen && (
                    <span
                      className={`text-[16px] ${
                        item.active ? 'font-medium text-[#005eb8]' : 'font-normal text-[#212121]'
                      } leading-[24px] font-[Noto_Sans]`}
                    >
                      {item.label}
                    </span>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Collapse button */}
          <div className="flex items-center justify-end gap-[12px] px-[16px] py-[24px]">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="cursor-pointer text-[#212121] hover:opacity-70"
            >
              <PanelLeft className="w-[24px] h-[24px]" />
            </button>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="w-full flex items-center justify-between px-[24px] py-[12px] bg-[#ffffff] border-b border-[#000000] shrink-0">
            <div className="flex-1" />
            <div className="flex items-center gap-[20px]">
              <HelpCircle className="w-[24px] h-[24px] text-[#212121] cursor-pointer" />
              <Bell className="w-[24px] h-[24px] text-[#212121] cursor-pointer" />
              <div className="w-px h-[32px] bg-black/[0.09] rounded-full" />
              <div className="relative">
                <div
                  className="flex items-center gap-[8px] cursor-pointer"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <div className="w-[32px] h-[32px] rounded-full bg-[#b3d1ff] flex items-center justify-center">
                    <span className="text-[14px] font-medium text-[#005eb8] font-[Noto_Sans]">CW</span>
                  </div>
                  <ChevronUp className="w-[16px] h-[16px] text-[#212121]" />
                </div>
                {showUserMenu && (
                  <div className="absolute right-0 top-[40px] w-[160px] bg-white rounded-[8px] shadow-[0px_4px_12px_rgba(0,0,0,0.15)] z-50 overflow-hidden">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-[16px] py-[12px] text-[14px] text-[#212121] font-[Noto_Sans] hover:bg-gray-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Scrollable dashboard content */}
          <main
            className="flex-1 overflow-y-auto"
            style={{ background: 'linear-gradient(to bottom, rgba(0,94,184,0.07) 0%, rgba(92,85,235,0.07) 73%)', backgroundColor: '#ffffff' }}
          >
            <div className="max-w-[980px] mx-auto px-[32px] py-[48px] pb-[100px] flex flex-col gap-[28px]">
              {/* Greeting */}
              <div className="flex flex-col gap-[12px]">
                <h1 className="text-[32px] font-bold leading-[38.4px] text-[#212121] font-[Noto_Sans]">Good evening, Chris 👋</h1>
                <p className="text-[16px] leading-[24px] text-[#6e6e6e] font-[Noto_Sans]">Here's an overview of your insurance policies and recent activities</p>
              </div>

              {/* Banner */}
              <div className="w-full h-[270px] rounded-[8px] overflow-hidden shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)]">
                <img src="https://s3-alpha-sig.figma.com/img/b174/518e/b937b0d57f4c2d0945d9af6744ea37cb?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=IgUA6SYvFf2bjGgsXM9J5LdtV64i7P4flXUmwMMHKPU2p-1U2k5xNVoMDLJGb36~0R9fhLA3-R4J8Oa6ZcLqag1QpNk-HKKxxuU-CGLDPXJ2bCTGjAYI75AgmPGXwCbFnru0pQrP17-RGZWVmZztqjrrj0iyzMaGAQi~e3rOYgP~wEvKIk~GREpl6aAlwcSxDSPWAwZ2HudtFnl80kbsFHUXAwYD7eLzdB1NQekU82kBZTpg1MxSE~pEY11CYUeEZ84SO-hyRPP68HVlYDyWBWmAFvksSIFj7q4WsTeptzmtxQeWEv2o2YTErSwcjm4BaJC1BmcmX7hfIVbtkZtFbw__" alt="Marketing Banner" className="w-full h-full object-cover" />
              </div>

              {/* Quick Actions */}
              <div className="flex flex-col gap-[20px]">
                <h2 className="text-[20px] font-bold leading-[24px] text-[#212121] font-[Noto_Sans]">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
                  {[
                    { icon: <ChevronUp className="w-[24px] h-[24px]" />, title: 'Submit Claim', desc: 'Prepare documents for claims' },
                    { icon: <Shield className="w-[24px] h-[24px]" />, title: 'Buy New Policy', desc: 'Explore a wide range of policies' },
                    { icon: <HelpCircle className="w-[24px] h-[24px]" />, title: 'Help & Support', desc: 'Learn more about our FAQs' },
                  ].map((action) => (
                    <div
                      key={action.title}
                      className="flex flex-col p-[16px] gap-[24px] bg-[#ffffff] rounded-[8px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-[12px]">
                        <span className="text-[#212121]">{action.icon}</span>
                        <div className="flex flex-col gap-[4px]">
                          <span className="text-[16px] font-medium leading-[24px] text-[#212121] font-[Noto_Sans]">{action.title}</span>
                          <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">{action.desc}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Your Coverage */}
              <div className="flex flex-col gap-[20px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[8px]">
                    <span className="text-[20px] font-bold leading-[24px] text-[#212121] font-[Noto_Sans]">Your Coverage</span>
                    <span className="text-[20px] leading-[24px] text-[#6e6e6e] font-[Noto_Sans]">(5)</span>
                  </div>
                  <button className="flex items-center gap-[4px] cursor-pointer hover:opacity-70">
                    <span className="text-[14px] text-[#0d6efd] font-[Noto_Sans]">View All</span>
                    <ArrowRight className="w-[16px] h-[16px] text-[#0d6efd]" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
                  {loading
                    ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
                    : cards.map((card) => (
                        <div
                          key={card.id}
                          className="flex flex-col rounded-[8px] overflow-hidden shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)]"
                        >
                          {/* Card header */}
                          <div className="flex items-center justify-between px-[16px] py-[16px] bg-[#ffffff] border-b border-[#000000] rounded-tl-[8px] rounded-tr-[8px]">
                            <div className="flex items-center gap-[8px]">
                              {card.icon}
                              <span className="text-[16px] font-medium leading-[24px] text-[#212121] font-[Noto_Sans]">{card.title}</span>
                            </div>
                            {card.status === 'covered' ? (
                              <div className="flex items-center gap-[4px] px-[8px] py-[4px] bg-[#005eb8] rounded-[24px]">
                                <ShieldCheck className="w-[12px] h-[12px] text-white" />
                                <span className="text-[12px] font-medium text-white font-[Noto_Sans]">COVERED</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-[4px] px-[8px] py-[4px] bg-[#f5f5f5] rounded-[24px]">
                                <span className="text-[12px] font-medium text-[#8d8d8d] font-[Noto_Sans]">NOT COVERED</span>
                              </div>
                            )}
                          </div>

                          {/* Card body */}
                          <div className="flex-1 p-[16px] bg-[#ffffff] rounded-bl-[8px] rounded-br-[8px] flex flex-col gap-[12px]">
                            {card.status === 'covered' && card.id === 'travel' && (
                              <>
                                {/* Repurchase nudge */}
                                <div
                                  className="flex items-center justify-between px-[12px] py-[8px] rounded-[8px] border border-gray-200"
                                  style={{ background: 'linear-gradient(to bottom, rgba(0,94,184,0.07) 0%, rgba(92,85,235,0.07) 73%)' }}
                                >
                                  <span
                                    className="text-[14px] font-medium font-[Noto_Sans]"
                                    style={{ background: 'linear-gradient(to right, #005eb8 1%, #5c55eb 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                                  >
                                    New trip? Get covered in 2 minutes.
                                  </span>
                                  <button className="flex items-center justify-center px-[16px] py-[8px] bg-[#005eb8] rounded-[8px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] cursor-pointer hover:opacity-90">
                                    <span className="text-[14px] font-medium text-white font-[Noto_Sans] whitespace-nowrap">Buy Now</span>
                                  </button>
                                </div>
                                {card.policies?.map((policy, idx) => (
                                  <div key={idx} className="flex items-center justify-between px-[12px] py-[12px] bg-[#f9f9f9] rounded-[12px] cursor-pointer hover:bg-gray-100">
                                    <div className="flex flex-col gap-[4px]">
                                      <div className="flex items-center gap-[8px]">
                                        <span className="text-[14px] font-medium text-[#212121] font-[Noto_Sans]">{policy.name}</span>
                                        <span className={`text-[12px] px-[6px] py-[2px] rounded-full font-[Noto_Sans] ${policy.badgeColor}`}>{policy.badge}</span>
                                      </div>
                                      <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">{policy.policyNo}</span>
                                    </div>
                                    <ChevronRight className="w-[16px] h-[16px] text-[#212121]" />
                                  </div>
                                ))}
                              </>
                            )}
                            {card.status === 'covered' && card.id !== 'travel' && (
                              <>
                                {card.policies?.map((policy, idx) => (
                                  <div key={idx} className="flex items-center justify-between px-[12px] py-[12px] bg-[#f9f9f9] rounded-[12px] cursor-pointer hover:bg-gray-100">
                                    <div className="flex flex-col gap-[4px]">
                                      <div className="flex items-center gap-[8px]">
                                        <span className="text-[14px] font-medium text-[#212121] font-[Noto_Sans]">{policy.name}</span>
                                        <span className={`text-[12px] px-[6px] py-[2px] rounded-full font-[Noto_Sans] ${policy.badgeColor}`}>{policy.badge}</span>
                                      </div>
                                      <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Policy No: {policy.policyNo}</span>
                                    </div>
                                    <ChevronRight className="w-[16px] h-[16px] text-[#212121]" />
                                  </div>
                                ))}
                              </>
                            )}
                            {card.status === 'not-covered' && (
                              <p className="text-[16px] leading-[24px] text-[#212121] font-[Noto_Sans]">
                                {card.notCoveredText?.split('here').map((part, i, arr) =>
                                  i < arr.length - 1
                                    ? <span key={i}>{part}<span className="text-[#005eb8] underline cursor-pointer">here</span></span>
                                    : <span key={i}>{part}</span>
                                )}
                              </p>
                            )}
                            {card.status === 'error' && (
                              <div className="flex flex-col gap-[8px]">
                                <p className="text-[14px] text-[#dc3545] font-[Noto_Sans]">{card.errorMessage}</p>
                                <button
                                  onClick={fetchDashboard}
                                  className="text-[14px] text-[#005eb8] underline cursor-pointer font-[Noto_Sans] text-left"
                                >
                                  Retry
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                  }
                </div>
              </div>

              {/* Rewards */}
              <div className="flex flex-col gap-[20px]">
                <div className="flex items-center justify-between">
                  <span className="text-[20px] font-bold leading-[24px] text-[#212121] font-[Noto_Sans]">Rewards</span>
                  <button className="flex items-center gap-[4px] cursor-pointer hover:opacity-70">
                    <span className="text-[14px] text-[#0d6efd] font-[Noto_Sans]">View All</span>
                    <ArrowRight className="w-[16px] h-[16px] text-[#0d6efd]" />
                  </button>
                </div>

                <div className="flex flex-row gap-[20px] overflow-x-auto scrollbar-hide pb-[8px]">
                  {rewards.map((reward, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col shrink-0 w-[313px] rounded-[8px] overflow-hidden shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] bg-[#ffffff]"
                    >
                      <div className="relative">
                        <img
                          src={reward.img}
                          alt={reward.title}
                          className="w-[313px] h-[176px] object-cover rounded-tl-[8px] rounded-tr-[8px]"
                        />
                        <img
                          src={reward.logo}
                          alt="Partner logo"
                          className="absolute bottom-[-26px] right-[16px] w-[52px] h-[52px] rounded-full object-cover border-2 border-white"
                        />
                      </div>
                      <div className="flex flex-col justify-between p-[16px] gap-[24px] flex-1 mt-[16px]">
                        <div className="flex flex-col gap-[12px]">
                          <span className="text-[16px] font-medium leading-[24px] text-[#212121] font-[Noto_Sans]">{reward.title}</span>
                          <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">{reward.desc}</span>
                        </div>
                        <button className="flex items-center justify-center px-[16px] py-[12px] bg-[#005eb8] rounded-[8px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] cursor-pointer hover:opacity-90 transition-opacity">
                          <span className="text-[16px] font-medium leading-[24px] text-[#ffffff] font-[Noto_Sans]">{reward.btn}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                  <button className="flex items-center justify-center shrink-0 w-[40px] h-[40px] self-center">
                    <ChevronRight className="w-[40px] h-[40px] text-[#212121]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="w-full flex items-center justify-between py-[16px] px-[24px] bg-[#005eb8]">
              <span className="text-[14px] leading-[21px] text-[#ffffff] font-[Noto_Sans]">Copyright © 2026 United Overseas Insurance Limited Co. Reg. No. 197100152R.</span>
              <span className="text-[14px] leading-[21px] text-right text-[#ffffff] font-[Noto_Sans]">All Rights Reserved.</span>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
