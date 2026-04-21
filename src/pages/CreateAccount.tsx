import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, ChevronLeft, Eye, EyeOff, CheckCircle2, Circle } from 'lucide-react'

type Step = 'details' | 'otp' | 'password'

export default function CreateAccount() {
  const navigate = useNavigate()

  // Step
  const [step, setStep] = useState<Step>('details')

  // Step 1: Details
  const [nric, setNric] = useState('')
  const [dob, setDob] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [showOtpToast, setShowOtpToast] = useState(false)

  // Step 2: OTP
  const [otp, setOtp] = useState('')
  const [otpError, setOtpError] = useState('')

  // Step 3: Password
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')

  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)

  const passwordChecks = {
    length: password.length >= 8,
    upperLower: /[a-z]/.test(password) && /[A-Z]/.test(password),
    numberSymbol: /[0-9!@#$%^&*]/.test(password),
  }
  const allChecks = passwordChecks.length && passwordChecks.upperLower && passwordChecks.numberSymbol

  const handleGetOtp = () => {
    if (!validateEmail(email)) {
      setEmailError('Invalid email address')
      return
    }
    setEmailError('')
    setOtpSent(true)
    setShowOtpToast(true)
    setTimeout(() => setShowOtpToast(false), 3000)
  }

  const handleNext = () => {
    if (step === 'details') {
      if (!otpSent) {
        if (!validateEmail(email)) {
          setEmailError('Invalid email address')
          return
        }
        handleGetOtp()
        return
      }
      // Move to OTP step
      setStep('otp')
    } else if (step === 'otp') {
      // Accept any OTP
      setStep('password')
    }
  }

  const handleCreateAccount = () => {
    let hasError = false
    if (!allChecks) {
      setPasswordError('Password must be at least 8 characters and include letters and numbers.')
      hasError = true
    } else {
      setPasswordError('')
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError('Password do not match, try again.')
      hasError = true
    } else {
      setConfirmPasswordError('')
    }
    if (hasError) return
    setTimeout(() => navigate('/login'), 800)
  }

  return (
    <div className="min-h-screen w-full flex flex-col relative">
      {/* OTP Toast */}
      {showOtpToast && (
        <div className="absolute top-[24px] left-1/2 -translate-x-1/2 z-50 flex items-center gap-[8px] px-[16px] py-[8px] bg-[#d8ffe2] rounded-[8px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)]">
          <CheckCircle2 className="w-[16px] h-[16px] text-green-600" />
          <span className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">OTP sent to email address.</span>
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
            {/* Step: Details */}
            {step === 'details' && (
              <>
                {/* Header */}
                <div className="flex flex-col items-center gap-[12px] w-full">
                  <img src="https://s3-alpha-sig.figma.com/img/26ec/3ab4/0588c7482da725dcdeb68b2897f9bde2?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ShoM0pDLFtIglvPWeRLcrNHkP-8DajZ~UfTydATZnIyvxRx0Q8vNaKu-xBitsol0veqqwq1r4p1azXwhatXwj7sKArxvuNthVWmFirx22koohe8997mFNM6GF2P9FJZQ6hnguVRCcCTWizRFgiWWnqabTviIJl1EuaMxA65dwinn4u47OVQuKOW4HPfBJ49i-x-lqHrsAbGLy9XfBAQqpYzMCSsmnWFH-jgrpSRysU3HqoilRLqyQb6LtiIX7mix4qKeTiJI50ywXWQYf5zHXGyqc7Ry5JQaJUdS88v~1e1Kd-i6t7RipipnfhyJG71UbhW-m-9vh~8Pv9t2nKWPxg__" alt="UOI Logo" className="w-[100px] h-[50px] object-contain" />
                  <p className="text-[32px] font-bold leading-[38.4px] text-center text-[#212121] font-[Noto_Sans]">Create Account</p>
                  <p className="text-[16px] leading-[24px] text-center text-[#212121] font-[Noto_Sans]">Check that information you provide is accurate before proceeding.</p>
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

                  {/* Date of Birth */}
                  <div className="flex flex-col gap-[12px] w-full">
                    <label className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">Date of Birth</label>
                    <div className="w-full h-[48px] px-[16px] py-[12px] bg-[#ffffff] rounded-[8px] border border-[#000000] flex items-center justify-between">
                      <input
                        type="text"
                        placeholder="DD/MM/YYYY"
                        value={dob}
                        onChange={e => setDob(e.target.value)}
                        className="flex-1 bg-transparent text-[16px] leading-[24px] text-[#212121] font-[Noto_Sans] outline-none"
                      />
                      <Calendar className="w-[24px] h-[24px] text-[#212121]" />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="flex flex-col gap-[8px] w-full">
                    <div className="flex flex-col gap-[12px] w-full">
                      <label className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">Email Address</label>
                      <div className={`w-full h-[48px] px-[16px] py-[12px] bg-[#ffffff] rounded-[8px] border ${emailError ? 'border-[#dc3545]' : 'border-[#000000]'} flex items-center gap-[8px]`}>
                        <input
                          type="email"
                          value={email}
                          onChange={e => { setEmail(e.target.value); setEmailError('') }}
                          className="flex-1 bg-transparent text-[16px] leading-[24px] text-[#212121] font-[Noto_Sans] outline-none"
                        />
                        {!otpSent && email && (
                          <button
                            onClick={handleGetOtp}
                            className="flex items-center justify-center px-[16px] py-[8px] bg-[#ffffff] rounded-[8px] border border-[#005eb8] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] cursor-pointer hover:opacity-90"
                          >
                            <span className="text-[14px] font-medium leading-[21px] text-[#005eb8] font-[Noto_Sans] whitespace-nowrap">Get OTP</span>
                          </button>
                        )}
                      </div>
                    </div>
                    {emailError && (
                      <div className="flex items-center gap-[8px]">
                        <div className="w-[16px] h-[16px] rounded-full bg-[#dc3545] flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-[10px] font-bold">!</span>
                        </div>
                        <span className="text-[12px] leading-[16.8px] text-[#dc3545] font-[Noto_Sans]">{emailError}</span>
                      </div>
                    )}
                  </div>

                  {/* OTP field (shown after OTP sent) */}
                  {otpSent && (
                    <div className="flex flex-col gap-[12px] w-full">
                      <div className={`w-full h-[48px] px-[16px] py-[12px] bg-[#ffffff] rounded-[8px] border ${otpError ? 'border-[#dc3545]' : 'border-[#000000]'} flex items-center`}>
                        <input
                          type="text"
                          placeholder="Enter code"
                          value={otp}
                          onChange={e => { setOtp(e.target.value); setOtpError('') }}
                          className="flex-1 bg-transparent text-[16px] leading-[24px] text-[#212121] font-[Noto_Sans] outline-none placeholder-[#8d8d8d]"
                        />
                      </div>
                      {otpError && (
                        <div className="flex items-center gap-[8px]">
                          <div className="w-[16px] h-[16px] rounded-full bg-[#dc3545] flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-[10px] font-bold">!</span>
                          </div>
                          <span className="text-[12px] leading-[16.8px] text-[#dc3545] font-[Noto_Sans]">{otpError}</span>
                        </div>
                      )}
                      <span
                        className="text-[14px] leading-[21px] text-[#0d6efd] font-[Noto_Sans] cursor-pointer"
                        onClick={handleGetOtp}
                      >
                        Didn't receive a code? Resend
                      </span>
                    </div>
                  )}
                </div>

                {/* Next button */}
                <button
                  onClick={handleNext}
                  className="w-full flex items-center justify-center py-[14px] px-[40px] bg-[#005eb8] rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <span className="text-[16px] font-medium leading-[24px] text-[#ffffff] font-[Noto_Sans]">Next</span>
                </button>
              </>
            )}

            {/* Step: Password */}
            {step === 'password' && (
              <>
                {/* Back */}
                <div
                  className="flex items-center gap-[4px] w-full cursor-pointer"
                  onClick={() => setStep('details')}
                >
                  <ChevronLeft className="w-[20px] h-[20px] text-[#6e6e6e]" />
                  <span className="text-[14px] leading-[21px] text-[#6e6e6e] font-[Noto_Sans]">Back</span>
                </div>

                {/* Header */}
                <div className="flex flex-col items-center gap-[12px] w-full">
                  <img src="https://s3-alpha-sig.figma.com/img/26ec/3ab4/0588c7482da725dcdeb68b2897f9bde2?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ShoM0pDLFtIglvPWeRLcrNHkP-8DajZ~UfTydATZnIyvxRx0Q8vNaKu-xBitsol0veqqwq1r4p1azXwhatXwj7sKArxvuNthVWmFirx22koohe8997mFNM6GF2P9FJZQ6hnguVRCcCTWizRFgiWWnqabTviIJl1EuaMxA65dwinn4u47OVQuKOW4HPfBJ49i-x-lqHrsAbGLy9XfBAQqpYzMCSsmnWFH-jgrpSRysU3HqoilRLqyQb6LtiIX7mix4qKeTiJI50ywXWQYf5zHXGyqc7Ry5JQaJUdS88v~1e1Kd-i6t7RipipnfhyJG71UbhW-m-9vh~8Pv9t2nKWPxg__" alt="UOI Logo" className="w-[100px] h-[50px] object-contain" />
                  <p className="text-[32px] font-bold leading-[38.4px] text-center text-[#212121] font-[Noto_Sans]">Set Password</p>
                  <p className="text-[16px] leading-[24px] text-center text-[#212121] font-[Noto_Sans]">Enter a password for your new account.</p>
                </div>

                {/* Password fields */}
                <div className="flex flex-col gap-[16px] w-full">
                  {/* Password */}
                  <div className="flex flex-col gap-[12px] w-full">
                    <label className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">Password</label>
                    <div className={`w-full h-[48px] px-[16px] py-[12px] bg-[#ffffff] rounded-[8px] border ${passwordError ? 'border-[#dc3545]' : 'border-[#000000]'} flex items-center justify-between`}>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={e => { setPassword(e.target.value); setPasswordError('') }}
                        className="flex-1 bg-transparent text-[16px] leading-[24px] text-[#212121] font-[Noto_Sans] outline-none"
                      />
                      <button onClick={() => setShowPassword(!showPassword)} className="ml-[8px]">
                        {showPassword ? <EyeOff className="w-[24px] h-[24px]" /> : <Eye className="w-[24px] h-[24px]" />}
                      </button>
                    </div>
                    {passwordError && (
                      <div className="flex items-start gap-[8px]">
                        <div className="w-[16px] h-[16px] rounded-full bg-[#dc3545] flex items-center justify-center flex-shrink-0 mt-[1px]">
                          <span className="text-white text-[10px] font-bold">!</span>
                        </div>
                        <span className="text-[12px] leading-[16.8px] text-[#dc3545] font-[Noto_Sans]">{passwordError}</span>
                      </div>
                    )}

                    {/* Password requirements */}
                    {!passwordError && (
                      <div className="flex flex-col gap-[8px]">
                        <span className="text-[12px] leading-[16.8px] text-[#6e6e6e] font-[Noto_Sans]">Your password must contain at least:</span>
                        <div className="flex items-center gap-[8px]">
                          {passwordChecks.length
                            ? <CheckCircle2 className="w-[16px] h-[16px] text-green-500" />
                            : <Circle className="w-[16px] h-[16px] text-[#6e6e6e]" />
                          }
                          <span className="text-[12px] leading-[16.8px] text-[#6e6e6e] font-[Noto_Sans]">8 characters</span>
                        </div>
                        <div className="flex items-center gap-[8px]">
                          {passwordChecks.upperLower
                            ? <CheckCircle2 className="w-[16px] h-[16px] text-green-500" />
                            : <Circle className="w-[16px] h-[16px] text-[#6e6e6e]" />
                          }
                          <span className="text-[12px] leading-[16.8px] text-[#6e6e6e] font-[Noto_Sans]">1 uppercase and lowercase letter</span>
                        </div>
                        <div className="flex items-center gap-[8px]">
                          {passwordChecks.numberSymbol
                            ? <CheckCircle2 className="w-[16px] h-[16px] text-green-500" />
                            : <Circle className="w-[16px] h-[16px] text-[#6e6e6e]" />
                          }
                          <span className="text-[12px] leading-[16.8px] text-[#6e6e6e] font-[Noto_Sans]">1 number or symbol (e.g. !, @, #)</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="flex flex-col gap-[12px] w-full">
                    <label className="text-[14px] leading-[21px] text-[#212121] font-[Noto_Sans]">Confirm Password</label>
                    <div className={`w-full h-[48px] px-[16px] py-[12px] bg-[#ffffff] rounded-[8px] border ${confirmPasswordError ? 'border-[#dc3545]' : 'border-[#000000]'} flex items-center justify-between`}>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={e => { setConfirmPassword(e.target.value); setConfirmPasswordError('') }}
                        className="flex-1 bg-transparent text-[16px] leading-[24px] text-[#212121] font-[Noto_Sans] outline-none"
                      />
                      <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="ml-[8px]">
                        {showConfirmPassword ? <EyeOff className="w-[24px] h-[24px]" /> : <Eye className="w-[24px] h-[24px]" />}
                      </button>
                    </div>
                    {confirmPasswordError && (
                      <div className="flex items-center gap-[8px]">
                        <div className="w-[16px] h-[16px] rounded-full bg-[#dc3545] flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-[10px] font-bold">!</span>
                        </div>
                        <span className="text-[12px] leading-[16.8px] text-[#dc3545] font-[Noto_Sans]">{confirmPasswordError}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Create Account button */}
                <button
                  onClick={handleCreateAccount}
                  className="w-full flex items-center justify-center py-[14px] px-[40px] bg-[#005eb8] rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <span className="text-[16px] font-medium leading-[24px] text-[#ffffff] font-[Noto_Sans]">Create Account</span>
                </button>
              </>
            )}
          </div>

          {/* Footer links */}
          <div className="flex flex-col gap-[12px] w-full max-w-[420px] mt-[24px]">
            <p className="text-[14px] leading-[21px] text-center text-[#6e6e6e] font-[Noto_Sans]">
              Already have an account?{' '}
              <span
                className="text-[#005eb8] underline cursor-pointer"
                onClick={() => navigate('/login')}
              >
                Log in
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
