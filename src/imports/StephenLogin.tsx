import svgPaths from "./svg-kc6mh9iav6";
import imgEllipse15 from "figma:asset/e9204f2a942f15c451844cb91363c2a24934fa13.png";
type LoginButtonProps = {
  className?: string;
  property1?: "Default" | "Back" | "Inactive";
};

function LoginButton({ className, property1 = "Default" }: LoginButtonProps) {
  const isBack = property1 === "Back";
  const isInactive = property1 === "Inactive";
  return (
    <div className={className || `-translate-x-1/2 relative rounded-[6px] w-[153px] ${isBack ? "bg-[#f7f9fb]" : isInactive ? "bg-[#7ba9d1]" : "bg-[#0082ca]"}`}>
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center overflow-clip p-[10px] relative w-full">
          <p className={`font-["Inter:Bold",sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[20px] text-center whitespace-nowrap ${isBack ? "text-[#4b5563]" : "text-white"}`}>{isBack ? "Back" : isInactive ? "Login" : "Login"}</p>
        </div>
      </div>
      {isBack && <div aria-hidden="true" className="absolute border border-[#4b5563] border-solid inset-0 pointer-events-none rounded-[6px]" />}
    </div>
  );
}

export default function StephenLogin() {
  return (
    <div className="bg-white relative size-full" data-name="Stephen Login">
      <div className="absolute bg-[#4b5563] bottom-[-0.44px] h-[34px] left-[-0.14%] overflow-clip right-[-0.11%]" data-name="bar/home/lit">
        <div className="absolute h-[34px] left-0 top-0 w-[375px]" data-name="frm" />
        <div className="-translate-x-1/2 absolute bg-[#e6edf2] bottom-[9px] h-[5px] left-[calc(50%+0.5px)] rounded-[5px] w-[134px]" data-name="indicator" />
      </div>
      <div className="absolute h-[44px] left-[-0.5px] top-[0.44px] w-[393px]" data-name="bar/status/lit">
        <div className="absolute h-[44px] left-0 top-0 w-[375px]" data-name="frm" />
        <div className="absolute h-[28px] left-0 top-[9px] w-[100px]" data-name="lef">
          <div className="absolute h-[28px] left-0 top-0 w-[100px]" data-name="frm" />
          <div className="absolute h-[28px] left-[21px] overflow-clip top-0 w-[54px]" data-name="bar/status/_res/time">
            <div className="absolute h-[28px] left-0 top-0 w-[54px]" data-name="frm" />
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Pro_Text:Semibold',sans-serif] h-[16px] justify-center leading-[0] left-[27px] not-italic text-[14px] text-black text-center top-[15px] w-[54px]">
              <p className="leading-[normal]">9:41</p>
            </div>
          </div>
        </div>
        <div className="absolute h-[28px] right-0 top-[9px] w-[100px]" data-name="bar/status/_res/info">
          <div className="absolute h-[28px] left-0 top-0 w-[100px]" data-name="frm" />
          <div className="absolute h-[12px] left-[61px] overflow-clip top-[8px] w-[25px]" data-name="battery">
            <div className="absolute h-[12px] left-0 top-0 w-[25px]" data-name="frm" />
            <div className="absolute contents inset-[2.75%_2.68%_2.83%_0]" data-name="battery">
              <div className="absolute contents left-0 top-[0.33px]" data-name="body">
                <div className="absolute border border-[rgba(0,0,0,0.4)] border-solid h-[11.33px] left-0 rounded-[2.67px] top-[0.33px] w-[22px]" data-name="bg" />
                <div className="absolute bg-black h-[7.33px] left-[2px] rounded-[1.33px] top-[2.33px] w-[18px]" data-name="power" />
              </div>
              <div className="absolute inset-[33.33%_2.68%_33.37%_92%]" data-name="head">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.33008 3.99512">
                  <path d={svgPaths.p21de74f0} fill="var(--fill-0, black)" fillOpacity="0.4" />
                </svg>
              </div>
            </div>
          </div>
          <div className="absolute h-[10.966px] left-[40.69px] top-[8.33px] w-[15.272px]" data-name="wifi">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.2724 10.9656">
              <path d={svgPaths.p18bc2b80} fill="var(--fill-0, black)" id="wifi" />
            </svg>
          </div>
          <div className="absolute h-[10.667px] left-[18.67px] top-[8.67px] w-[17px]" data-name="cell">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 10.6667">
              <path d={svgPaths.p26942ae0} fill="var(--fill-0, black)" id="cell" />
            </svg>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[185.761px] top-[calc(50%-43.12px)]" data-name="User">
        <div className="absolute left-0 size-[185.761px] top-0">
          <img alt="" className="absolute block max-w-none size-full" height="185.761" src={imgEllipse15} width="185.761" />
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bottom-[64px] content-stretch flex gap-[25px] items-center left-[calc(50%+11.42px)]" data-name="Login and Back">
        <LoginButton className="bg-[#f7f9fb] relative rounded-[6px] shrink-0 w-[153px]" property1="Back" />
        <LoginButton className="bg-[#0082ca] relative rounded-[6px] shrink-0 w-[153px]" />
      </div>
      <div className="-translate-x-1/2 absolute bg-[#4b5563] bottom-[77%] left-[calc(50%-0.5px)] overflow-clip top-[8.69%] w-[392px]" data-name="Logo">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[71.795px] left-[calc(50%+0.55px)] top-[calc(50%-1.16px)] w-[93.713px]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 93.7131 71.7951">
            <g id="Vector">
              <path d={svgPaths.p3618d680} fill="#E6EDF2" />
              <path clipRule="evenodd" d={svgPaths.p10e49100} fill="#E6EDF2" fillRule="evenodd" />
              <path d={svgPaths.p22388200} fill="#E6EDF2" />
              <path d={svgPaths.p37bf9780} fill="#6B7280" />
              <path d={svgPaths.p29438680} fill="var(--fill-0, #29C5F6)" />
              <path d={svgPaths.p37324d80} fill="var(--fill-0, #29C5F6)" />
              <path d={svgPaths.p24c96400} fill="var(--fill-0, #29C5F6)" />
              <path d={svgPaths.p2b28d360} fill="var(--fill-0, #29C5F6)" />
              <path d={svgPaths.p3868f140} fill="var(--fill-0, #29C5F6)" />
              <path d={svgPaths.p36df3100} fill="var(--fill-0, #29C5F6)" />
            </g>
          </svg>
        </div>
      </div>
      <div className="absolute left-[-1.08px] top-[475px] w-[393px]" data-name="User Short Description">
        <div className="content-stretch flex flex-col gap-[23px] items-start leading-[normal] not-italic px-[50px] relative text-black w-full">
          <p className="capitalize font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[32px] text-center w-full">Stephen</p>
          <p className="capitalize font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[18px] text-center w-full">Data Analyst, Assesor</p>
          <p className="font-['Inter:Regular',sans-serif] font-normal h-[120.655px] relative shrink-0 text-[16px] w-full">Works at National Highways, reviews assessed defects, defines repair strategies and treatments, sets maintenance priorities, and manages urgent make-safe repairs.</p>
        </div>
      </div>
    </div>
  );
}