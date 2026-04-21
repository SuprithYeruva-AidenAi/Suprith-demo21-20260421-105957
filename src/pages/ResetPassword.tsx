import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Eye, EyeOff, CheckCircle2 } from 'lucide-react'

type ResetStep = 'login-error' | 'new-device-otp' | 'forgot-password' | 'reset-password'

export default function ResetPassword() {
  const navigate = useNavigate()
  const [step, setStep] = useState<ResetStep>('forgot-password')

  // Login error state
  const [nric, setNric] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // New device OTP
  const [deviceOtp, setDeviceOtp] = useState('')

  // Forgot password
  const [forgotEmail, setForgotEmail] = useState('')
  const [emailSentToast, setEmailSentToast] = useState(false)

  // Reset password
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)
  const [passwordUpdatedToast, setPasswordUpdatedToast] = useState(false)

  const handleSendEmail = () => {
    setEmailSentToast(true)
    setTimeout(() => {
      setEmailSentToast(false)
      setStep('reset-password')
    }, 2000)
  }

  const handleVerifyOtp = () => {
    setTimeout(() => navigate('/dashboard'), 500)
  }

  const handleConfirmReset = () => {
    setPasswordUpdatedToast(true)
    setTimeout(() => {
      setPasswordUpdatedToast(false)
      navigate('/login')
    }, 2000)
  }

  const handleLoginSubmit = () => {
    setTimeout(() => navigate('/dashboard'), 800)
  }

  return (
    <div className="min-h-screen w-full flex flex-col relative">
      {/* Email sent toast */}
      {emailSentToast && (
        <div className="absolute top-[24px] left-1/2 -translate-x-1/2 z-50 flex items-center gap-[8px] px-[16px] py-[8px] bg-[#d8ffe2] rounded-[8px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)]">
          <CheckCircle2 className="w-[16px] h-[16px] text-green-600" />
          <span className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">Password reset email sent.</span>
        </div>
      )}

      {/* Password updated toast */}
      {passwordUpdatedToast && (
        <div className="absolute top-[24px] left-1/2 -translate-x-1/2 z-50 flex items-center gap-[8px] px-[16px] py-[8px] bg-[#d8ffe2] rounded-[8px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)]">
          <CheckCircle2 className="w-[16px] h-[16px] text-green-600" />
          <span className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">Password updated successfully.</span>
        </div>
      )}

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
            {/* FORGOT PASSWORD STEP */}
            {step === 'forgot-password' && (
              <>
                <div className="flex items-center gap-[4px] w-full cursor-pointer" onClick={() => navigate('/login')}>
                  <ChevronLeft className="w-[20px] h-[20px] text-[#6e6e6e]" />
                  <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Back</span>
                </div>

                <div className="flex flex-col items-center gap-[12px] w-full">
                  <img src="https://s3-alpha-sig.figma.com/img/26ec/3ab4/0588c7482da725dcdeb68b2897f9bde2?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ShoM0pDLFtIglvPWeRLcrNHkP-8DajZ~UfTydATZnIyvxRx0Q8vNaKu-xBitsol0veqqwq1r4p1azXwhatXwj7sKArxvuNthVWmFirx22koohe8997mFNM6GF2P9FJZQ6hnguVRCcCTWizRFgiWWnqabTviIJl1EuaMxA65dwinn4u47OVQuKOW4HPfBJ49i-x-lqHrsAbGLy9XfBAQqpYzMCSsmnWFH-jgrpSRysU3HqoilRLqyQb6LtiIX7mix4qKeTiJI50ywXWQYf5zHXGyqc7Ry5JQaJUdS88v~1e1Kd-i6t7RipipnfhyJG71UbhW-m-9vh~8Pv9t2nKWPxg__" alt="UOI Logo" className="w-[100px] h-[50px] object-contain" />
                  <p className="text-[32px] font-bold leading-[38.4px] text-center text-[#212121] font-[Noto_Sans]">Forgot Password</p>
                  <p className="text-[16px] leading-[24px] text-center text-[#212121] font-[Noto_Sans]">Enter your account's email address and we'll send you an email to reset password</p>
                </div>

                <div className="flex flex-col gap-[12px] w-full">
                  <label className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">Email</label>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={e => setForgotEmail(e.target.value)}
                    className="w-full h-[48px] px-[16px] py-[12px] bg-[#ffffff] rounded-[8px] border border-[#000000] text-[16px] leading-[24px] text-[#212121] font-[Noto_Sans] outline-none"
                  />
                </div>

                <button
                  onClick={handleSendEmail}
                  className="w-full flex items-center justify-center py-[14px] px-[40px] bg-[#005eb8] rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <span className="text-[16px] font-medium leading-[24px] text-[#ffffff] font-[Noto_Sans]">Send Email</span>
                </button>
              </>
            )}

            {/* NEW DEVICE OTP STEP */}
            {step === 'new-device-otp' && (
              <>
                <div className="flex flex-col items-center gap-[12px] w-full">
                  <img src="https://s3-alpha-sig.figma.com/img/26ec/3ab4/0588c7482da725dcdeb68b2897f9bde2?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ShoM0pDLFtIglvPWeRLcrNHkP-8DajZ~UfTydATZnIyvxRx0Q8vNaKu-xBitsol0veqqwq1r4p1azXwhatXwj7sKArxvuNthVWmFirx22koohe8997mFNM6GF2P9FJZQ6hnguVRCcCTWizRFgiWWnqabTviIJl1EuaMxA65dwinn4u47OVQuKOW4HPfBJ49i-x-lqHrsAbGLy9XfBAQqpYzMCSsmnWFH-jgrpSRysU3HqoilRLqyQb6LtiIX7mix4qKeTiJI50ywXWQYf5zHXGyqc7Ry5JQaJUdS88v~1e1Kd-i6t7RipipnfhyJG71UbhW-m-9vh~8Pv9t2nKWPxg__" alt="UOI Logo" className="w-[100px] h-[50px] object-contain" />
                  <p className="text-[32px] font-bold leading-[38.4px] text-center text-[#212121] font-[Noto_Sans]">Logging in on a new device?</p>
                  <p className="text-[16px] leading-[24px] text-center text-[#212121] font-[Noto_Sans]">
                    We've sent a one-time password (OTP) to{' '}
                    <br />ch****@gmail.com
                  </p>
                </div>

                <div className="flex flex-col gap-[16px] w-full">
                  <div className="flex flex-col gap-[12px] w-full">
                    <label className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">Enter Code</label>
                    <input
                      type="text"
                      value={deviceOtp}
                      onChange={e => setDeviceOtp(e.target.value)}
                      className="w-full h-[48px] px-[16px] py-[12px] bg-[#ffffff] rounded-[8px] border border-[#000000] text-[16px] leading-[24px] text-[#212121] font-[Noto_Sans] outline-none"
                    />
                  </div>
                  <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">
                    Didn't receive a code?{' '}
                    <span className="text-[#0d6efd] cursor-pointer">Resend</span>
                  </span>
                </div>

                <button
                  onClick={handleVerifyOtp}
                  className="w-full flex items-center justify-center py-[14px] px-[40px] bg-[#005eb8] rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <span className="text-[16px] font-medium leading-[24px] text-[#ffffff] font-[Noto_Sans]">Verify</span>
                </button>
              </>
            )}

            {/* RESET PASSWORD STEP */}
            {step === 'reset-password' && (
              <>
                <div className="flex items-center gap-[4px] w-full cursor-pointer" onClick={() => navigate('/login')}>
                  <ChevronLeft className="w-[20px] h-[20px] text-[#6e6e6e]" />
                  <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Back to Login</span>
                </div>

                <div className="flex flex-col items-center gap-[12px] w-full">
                  <img src="https://s3-alpha-sig.figma.com/img/26ec/3ab4/0588c7482da725dcdeb68b2897f9bde2?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ShoM0pDLFtIglvPWeRLcrNHkP-8DajZ~UfTydATZnIyvxRx0Q8vNaKu-xBitsol0veqqwq1r4p1azXwhatXwj7sKArxvuNthVWmFirx22koohe8997mFNM6GF2P9FJZQ6hnguVRCcCTWizRFgiWWnqabTviIJl1EuaMxA65dwinn4u47OVQuKOW4HPfBJ49i-x-lqHrsAbGLy9XfBAQqpYzMCSsmnWFH-jgrpSRysU3HqoilRLqyQb6LtiIX7mix4qKeTiJI50ywXWQYf5zHXGyqc7Ry5JQaJUdS88v~1e1Kd-i6t7RipipnfhyJG71UbhW-m-9vh~8Pv9t2nKWPxg__" alt="UOI Logo" className="w-[100px] h-[50px] object-contain" />
                  <p className="text-[32px] font-bold leading-[38.4px] text-center text-[#212121] font-[Noto_Sans]">Reset Password</p>
                  <p className="text-[16px] leading-[24px] text-center text-[#212121] font-[Noto_Sans]">Check that information you provide is accurate before proceeding.</p>
                </div>

                <div className="flex flex-col gap-[16px] w-full">
                  {/* New Password */}
                  <div className="flex flex-col gap-[12px] w-full">
                    <label className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">Password</label>
                    <div className="w-full h-[48px] px-[16px] py-[12px] bg-[#ffffff] rounded-[8px] border border-[#000000] flex items-center justify-between">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        className="flex-1 bg-transparent text-[16px] leading-[24px] text-[#212121] font-[Noto_Sans] outline-none"
                      />
                      <button onClick={() => setShowNewPassword(!showNewPassword)} className="ml-[8px]">
                        {showNewPassword ? <EyeOff className="w-[24px] h-[24px]" /> : <Eye className="w-[24px] h-[24px]" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="flex flex-col gap-[12px] w-full">
                    <label className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">Confirm Password</label>
                    <div className="w-full h-[48px] px-[16px] py-[12px] bg-[#ffffff] rounded-[8px] border border-[#000000] flex items-center justify-between">
                      <input
                        type={showConfirmNewPassword ? 'text' : 'password'}
                        value={confirmNewPassword}
                        onChange={e => setConfirmNewPassword(e.target.value)}
                        className="flex-1 bg-transparent text-[16px] leading-[24px] text-[#212121] font-[Noto_Sans] outline-none"
                      />
                      <button onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)} className="ml-[8px]">
                        {showConfirmNewPassword ? <EyeOff className="w-[24px] h-[24px]" /> : <Eye className="w-[24px] h-[24px]" />}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleConfirmReset}
                  className="w-full flex items-center justify-center py-[14px] px-[40px] bg-[#005eb8] rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <span className="text-[16px] font-medium leading-[24px] text-[#ffffff] font-[Noto_Sans]">Confirm</span>
                </button>
              </>
            )}

            {/* LOGIN ERROR STEP */}
            {step === 'login-error' && (
              <>
                <div className="flex flex-col items-center gap-[12px] w-full">
                  <img src="https://s3-alpha-sig.figma.com/img/26ec/3ab4/0588c7482da725dcdeb68b2897f9bde2?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ShoM0pDLFtIglvPWeRLcrNHkP-8DajZ~UfTydATZnIyvxRx0Q8vNaKu-xBitsol0veqqwq1r4p1azXwhatXwj7sKArxvuNthVWmFirx22koohe8997mFNM6GF2P9FJZQ6hnguVRCcCTWizRFgiWWnqabTviIJl1EuaMxA65dwinn4u47OVQuKOW4HPfBJ49i-x-lqHrsAbGLy9XfBAQqpYzMCSsmnWFH-jgrpSRysU3HqoilRLqyQb6LtiIX7mix4qKeTiJI50ywXWQYf5zHXGyqc7Ry5JQaJUdS88v~1e1Kd-i6t7RipipnfhyJG71UbhW-m-9vh~8Pv9t2nKWPxg__" alt="UOI Logo" className="w-[100px] h-[50px] object-contain" />
                  <p className="text-[32px] font-bold leading-[38.4px] text-center text-[#212121] font-[Noto_Sans]">Welcome to UOI Customer Portal</p>
                  <p className="text-[16px] leading-[24px] text-center text-[#212121] font-[Noto_Sans]">Manage all your policies in one portal.</p>
                </div>

                <div className="flex flex-col gap-[16px] w-full">
                  <div className="flex flex-col gap-[12px] w-full">
                    <label className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">NRIC/FIN</label>
                    <input
                      type="text"
                      value={nric}
                      onChange={e => setNric(e.target.value)}
                      className="w-full h-[48px] px-[16px] py-[12px] bg-[#ffffff] rounded-[8px] border border-[#000000] text-[16px] leading-[24px] text-[#212121] font-[Noto_Sans] outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-[8px] w-full">
                    <div className="flex flex-col gap-[12px] w-full">
                      <label className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">Password</label>
                      <div className="w-full h-[48px] px-[16px] py-[12px] bg-[#ffffff] rounded-[8px] border border-[#dc3545] flex items-center justify-between">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          className="flex-1 bg-transparent text-[16px] leading-[24px] text-[#212121] font-[Noto_Sans] outline-none"
                        />
                        <button onClick={() => setShowPassword(!showPassword)} className="ml-[8px]">
                          {showPassword ? <EyeOff className="w-[24px] h-[24px]" /> : <Eye className="w-[24px] h-[24px]" />}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-[8px]">
                      <div className="w-[16px] h-[16px] rounded-full bg-[#dc3545] flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-[10px] font-bold">!</span>
                      </div>
                      <span className="text-[12px] leading-[16.8px] text-[#dc3545] font-[Noto_Sans]">Wrong password</span>
                    </div>
                  </div>

                  <span
                    className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans] underline cursor-pointer"
                    onClick={() => setStep('forgot-password')}
                  >
                    Forgot password?
                  </span>
                </div>

                <button
                  onClick={handleLoginSubmit}
                  className="w-full flex items-center justify-center py-[14px] px-[40px] bg-[#005eb8] rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <span className="text-[16px] font-medium leading-[24px] text-[#ffffff] font-[Noto_Sans]">Login</span>
                </button>
              </>
            )}
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
