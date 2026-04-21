import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Left: Login form */}
      <div
        className="flex-1 flex flex-col items-center justify-center py-[32px] px-[16px] md:px-0"
        style={{ background: 'linear-gradient(to bottom, rgba(0,94,184,0.07) 0%, rgba(92,85,235,0.07) 73%)' }}
      >
        <div
          className="w-full max-w-[420px] flex flex-col items-center gap-[32px] py-[32px] px-[32px] rounded-[24px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)]"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.56) 0%, rgba(255,255,255,0.08) 100%)', backgroundColor: 'rgba(255,255,255,0.70)' }}
        >
          {/* Header */}
          <div className="flex flex-col items-center gap-[12px] w-full">
            <img src="https://s3-alpha-sig.figma.com/img/26ec/3ab4/0588c7482da725dcdeb68b2897f9bde2?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ShoM0pDLFtIglvPWeRLcrNHkP-8DajZ~UfTydATZnIyvxRx0Q8vNaKu-xBitsol0veqqwq1r4p1azXwhatXwj7sKArxvuNthVWmFirx22koohe8997mFNM6GF2P9FJZQ6hnguVRCcCTWizRFgiWWnqabTviIJl1EuaMxA65dwinn4u47OVQuKOW4HPfBJ49i-x-lqHrsAbGLy9XfBAQqpYzMCSsmnWFH-jgrpSRysU3HqoilRLqyQb6LtiIX7mix4qKeTiJI50ywXWQYf5zHXGyqc7Ry5JQaJUdS88v~1e1Kd-i6t7RipipnfhyJG71UbhW-m-9vh~8Pv9t2nKWPxg__" alt="UOI Logo" className="w-[100px] h-[50px] object-contain" />
            <p className="text-[32px] font-bold leading-[38.4px] text-center text-[#212121] font-[Noto_Sans]">Welcome to UOI Customer Portal</p>
            <p className="text-[16px] leading-[24px] text-center text-[#212121] font-[Noto_Sans]">Manage all your policies in one portal.</p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col items-center gap-[24px] w-full">
            {/* Singpass button */}
            <button
              onClick={() => navigate('/dashboard')}
              className="w-[200px] h-[42px] flex items-center justify-center bg-[#f4333d] rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity"
            >
              <span className="text-[16px] font-medium leading-[24px] text-[#ffffff] font-[Noto_Sans]">Log in with Singpass</span>
            </button>

            {/* Or divider */}
            <div className="flex items-center gap-[16px] w-full">
              <div className="flex-1 h-px bg-[#e0e0e0]" />
              <span className="text-[16px] leading-[24px] text-center text-[#212121] font-[Noto_Sans]">or</span>
              <div className="flex-1 h-px bg-[#e0e0e0]" />
            </div>

            {/* NRIC/FIN button */}
            <button
              onClick={() => navigate('/login')}
              className="w-[200px] h-[42px] flex items-center justify-center bg-[#ffffff] rounded-[8px] border border-[#005eb8] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] cursor-pointer hover:opacity-90 transition-opacity"
            >
              <span className="text-[16px] font-medium leading-[24px] text-[#005eb8] font-[Noto_Sans]">Log in with NRIC/FIN</span>
            </button>
          </div>
        </div>

        {/* Footer links */}
        <div className="flex flex-col gap-[12px] w-full max-w-[420px] mt-[24px]">
          <p className="text-[14px] leading-[21px] text-center text-[#6e6e6e] font-[Noto_Sans]">
            Don't have an account?{' '}
            <span
              className="text-[#005eb8] underline cursor-pointer"
              onClick={() => navigate('/create-account')}
            >
              Create an account
            </span>
          </p>
          <p className="text-[14px] leading-[21px] text-center text-[#6e6e6e] font-[Noto_Sans]">
            If you're experiencing login issues, please contact us at{' '}
            <span className="text-[#005eb8]">help@uoi.com.sg.</span>
          </p>
        </div>
      </div>

      {/* Right: Hero image */}
      <div className="hidden md:block md:flex-1 relative">
        <img src="https://s3-alpha-sig.figma.com/img/aab6/0921/4d0afc4bf990cf584c0c3c3e94ab342d?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=evV6xk8x8mXwhl5DIkzHg2YvXWJLdjUEE4QzPiw6skwI8IIpjBvimdVwPWI3lvrYlZLeVrGLuFRhJSyQ4GLkoIysQRqfpOJ8dmtuYTF0s9CS2fmpshgKg~eT~~cvuqARWBTTgJbpm4EKFFQe~kRYW2YGiRqEXepHLEst6q0xBDgHIiQabxEZE9VchjDafhutP34bXOqxyem451w8M82FG1pcJ~uI8MojTj-DkPpVSG9U6c-dXDkuPq2ZLzeGBzySFlIhRmWkDUzHDYlXHEUa6ro4WFSx71OMT6F2uglnWSRUKZQXRbtGsylqIereApngRcCLus72riI1Hx4ANuxYcA__" alt="Travel" className="absolute inset-0 w-full h-full object-cover" />
      </div>
    </div>
  )
}
