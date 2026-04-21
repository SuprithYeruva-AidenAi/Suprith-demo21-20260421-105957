import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Eye, EyeOff } from 'lucide-react'

type LoginStep = 'form' | 'filled' | 'error'

export default function Login() {
  const navigate = useNavigate()
  const [nric, setNric] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    if (!nric) return
    if (!password) return
    setLoading(true)
    setPasswordError('')
    setTimeout(() => {
      setLoading(false)
      navigate('/dashboard')
    }, 800)
  }

  return (
    <div className="min-h-screen w-full flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left: Form */}
        <div
          className="flex-1 flex flex-col items-center justify-center py-[32px] px-[16px] md:px-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,94,184,0.07) 0%, rgba(92,85,235,0.07) 73%)' }}
        >
          <div
            className="w-full max-w-[420px] flex flex-col items-center gap-[32px] py-[32px] px-[24px] rounded-[24px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)]"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.56) 0%, rgba(255,255,255,0.08) 100%)', backgroundColor: 'rgba(255,255,255,0.70)' }}
          >
            {/* Header */}
            <div className="flex flex-col items-center gap-[12px] w-full">
              <img src="https://s3-alpha-sig.figma.com/img/26ec/3ab4/0588c7482da725dcdeb68b2897f9bde2?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ShoM0pDLFtIglvPWeRLcrNHkP-8DajZ~UfTydATZnIyvxRx0Q8vNaKu-xBitsol0veqqwq1r4p1azXwhatXwj7sKArxvuNthVWmFirx22koohe8997mFNM6GF2P9FJZQ6hnguVRCcCTWizRFgiWWnqabTviIJl1EuaMxA65dwinn4u47OVQuKOW4HPfBJ49i-x-lqHrsAbGLy9XfBAQqpYzMCSsmnWFH-jgrpSRysU3HqoilRLqyQb6LtiIX7mix4qKeTiJI50ywXWQYf5zHXGyqc7Ry5JQaJUdS88v~1e1Kd-i6t7RipipnfhyJG71UbhW-m-9vh~8Pv9t2nKWPxg__" alt="UOI Logo" className="w-[100px] h-[50px] object-contain" />
              <p className="text-[32px] font-bold leading-[38.4px] text-center text-[#212121] font-[Noto_Sans]">Welcome to UOI Customer Portal</p>
              <p className="text-[16px] leading-[24px] text-center text-[#212121] font-[Noto_Sans]">Manage all your policies in one portal.</p>
            </div>

            {/* Fields */}
            <div className="flex flex-col gap-[16px] w-full">
              {/* NRIC/FIN */}
              <div className="flex flex-col gap-[12px] w-full">
                <label className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">NRIC/FIN</label>
                <input
                  type="text"
                  value={nric}
                  onChange={e => setNric(e.target.value)}
                  className="w-full h-[48px] px-[16px] py-[12px] bg-[#ffffff] rounded-[8px] border border-[#000000] text-[16px] leading-[24px] text-[#212121] font-[Noto_Sans] outline-none"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-[8px] w-full">
                <div className="flex flex-col gap-[12px] w-full">
                  <label className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">Password</label>
                  <div className={`w-full h-[48px] px-[16px] py-[12px] bg-[#ffffff] rounded-[8px] border ${passwordError ? 'border-[#dc3545]' : 'border-[#000000]'} flex items-center justify-between`}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => { setPassword(e.target.value); setPasswordError('') }}
                      className="flex-1 bg-transparent text-[16px] leading-[24px] text-[#212121] font-[Noto_Sans] outline-none"
                    />
                    <button onClick={() => setShowPassword(!showPassword)} className="ml-[8px] text-[#212121]">
                      {showPassword ? <EyeOff className="w-[24px] h-[24px]" /> : <Eye className="w-[24px] h-[24px]" />}
                    </button>
                  </div>
                </div>
                {passwordError && (
                  <div className="flex items-center gap-[8px]">
                    <div className="w-[16px] h-[16px] rounded-full bg-[#dc3545] flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-[10px] font-bold">!</span>
                    </div>
                    <span className="text-[12px] leading-[16.8px] text-[#dc3545] font-[Noto_Sans]">{passwordError}</span>
                  </div>
                )}
              </div>

              {/* Forgot password */}
              <span
                className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans] underline cursor-pointer"
                onClick={() => navigate('/reset-password')}
              >
                Forgot password?
              </span>
            </div>

            {/* Login button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center py-[14px] px-[40px] bg-[#005eb8] rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-70"
            >
              <span className="text-[16px] font-medium leading-[24px] text-[#ffffff] font-[Noto_Sans]">
                {loading ? 'Logging in...' : 'Login'}
              </span>
            </button>
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

      {/* Footer */}
      <div className="w-full flex items-center justify-between py-[16px] px-[24px] bg-[#005eb8]">
        <span className="text-[14px] leading-[21px] text-[#ffffff] font-[Noto_Sans]">Copyright © 2026 United Overseas Insurance Limited Co. Reg. No. 197100152R.</span>
        <span className="text-[14px] leading-[21px] text-right text-[#ffffff] font-[Noto_Sans]">All Rights Reserved.</span>
      </div>
    </div>
  )
}
