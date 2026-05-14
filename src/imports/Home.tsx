import clsx from "clsx";
import svgPaths from "./svg-xk77xeqosj";
import imgFrame1039 from "figma:asset/08288cd528d89babbe002ec84156648601901062.png";
import imgFrame1040 from "figma:asset/8006bc7a2889cc23eb79e45d53d161f8133d10de.png";
import imgFrame1041 from "figma:asset/701d66b8faf30ecbb40e6d579f72395f43d89c1b.png";
import imgFrame1042 from "figma:asset/2505628e14419b260a25c1a0338c4254db917ab4.png";
import imgFrame1043 from "figma:asset/eb07da6f83f4ddf9f4ad0a321b4c73d3d887a803.png";
import imgFrame1044 from "figma:asset/da67a9172e308a5d1b4f32225012c1666e88f40b.png";
import imgFrame1045 from "figma:asset/d2ca9dcfeae268de28bcb4c84b85185f20ca5233.png";
import imgEllipse15 from "figma:asset/356d43fe51b4e3db5a03f4b1dca88fe89eeda706.png";
import imgEllipse16 from "figma:asset/90b64499c430e3a8c457c07e8e29111b73e3f6af.png";
import imgEllipse17 from "figma:asset/b4b6d747efc9b7581973d579874b7189a62cc1ee.png";
import imgEllipse18 from "figma:asset/447f19e7e9c3c83b626774e2a98cf50db73e0934.png";

function Frame1075Text1({ text }: Frame1075Text1Props) {
  return (
    <div className="flex flex-row items-center justify-end size-full">
      <div className="content-stretch flex items-center justify-end relative">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4b5563] text-[10px] whitespace-nowrap">{text}</p>
      </div>
    </div>
  );
}
type Label1Props = {
  additionalClassNames?: string;
};

function Label1({ additionalClassNames = "" }: Label1Props) {
  return (
    <div className="relative rounded-[18px] shrink-0">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[4px] py-[2px] relative">
          <Status cardIcons="Location" className="overflow-clip relative shrink-0 size-[20px]" />
          <StatusText text="A14" additionalClassNames="opacity-40" />
        </div>
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="relative rounded-[18px] shrink-0">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[4px] py-[2px] relative">
          <Status cardIcons="Days to fix" className="overflow-clip relative shrink-0 size-[20px]" />
          <StatusText text="18 days to fix" />
        </div>
      </div>
    </div>
  );
}
type Text1Props = {
  text: string;
  additionalClassNames?: string;
  text1: string;
};

function Text1({ text, children, additionalClassNames = "", text1 }: React.PropsWithChildren<Text1Props>) {
  return (
    <div className="bg-[#4b5563] relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start p-[6px] relative w-full">
        <Frame1075Text text="Crack?">{text}</Frame1075Text>
        <Frame1075LabelText text="case 2026_02_19_218" />
        <Label />
        <div className="content-stretch flex gap-[58px] items-center justify-end pb-px relative shrink-0 w-full">
          <Label1 />
          <div className="flex flex-row items-center self-stretch">
            <div className="bg-[#f7f9fb] h-full relative rounded-[18px] shrink-0" data-name="Label">
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex h-full items-center px-[12px] py-[6px] relative">
                  <div className="relative shrink-0" data-name="Status">
                    <div className="flex flex-row items-center justify-end size-full">
                      <div className="content-stretch flex items-center justify-end relative">
                        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4b5563] text-[10px] whitespace-nowrap">{text}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
type StatusTextProps = {
  text: string;
  additionalClassNames?: string;
};

function StatusText({ text, additionalClassNames = "" }: StatusTextProps) {
  return (
    <div className={clsx("relative shrink-0", additionalClassNames)}>
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end relative">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#f7f9fb] text-[10px] whitespace-nowrap">{text}</p>
        </div>
      </div>
    </div>
  );
}
type Frame1075LabelTextProps = {
  text: string;
};

function Frame1075LabelText({ text }: Frame1075LabelTextProps) {
  return (
    <div className="relative rounded-[18px] shrink-0">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center px-[4px] py-[2px] relative">
          <Status cardIcons="case" className="overflow-clip relative shrink-0 size-[20px]" />
          <StatusText text={text} />
        </div>
      </div>
    </div>
  );
}
type Frame1075TextProps = {
  text: string;
};

function Frame1075Text({ text, children }: React.PropsWithChildren<Frame1075TextProps>) {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">{text}</p>
      <div className="relative rounded-[18px] shrink-0" data-name="Label">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[4px] items-center px-[4px] py-[2px] relative">
            <Status cardIcons="Certainty" className="relative shrink-0 w-[20px]" />
            <div className="relative shrink-0" data-name="Status">
              <div className="flex flex-row items-center justify-end size-full">
                <div className="content-stretch flex items-center justify-end relative">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#f7f9fb] text-[10px] whitespace-nowrap">{children}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame1075Image() {
  return (
    <div className="h-[130px] overflow-clip relative shrink-0 w-full">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[136.92%] left-0 max-w-none top-[-14.23%] w-full" src={imgFrame1039} />
      </div>
      <Subtract className="absolute h-[34.37px] left-[137px] top-[-1px] w-[28px]" />
    </div>
  );
}
type TextProps = {
  text: string;
};

function Text({ text }: TextProps) {
  return (
    <div className="flex flex-row items-center size-full">
      <div className="content-stretch flex items-center p-[10px] relative">
        <p className="capitalize font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#4b5563] text-[18px] whitespace-nowrap">{text}</p>
      </div>
    </div>
  );
}
type Frame1075SubheadingsTextProps = {
  text: string;
};

function Frame1075SubheadingsText({ text }: Frame1075SubheadingsTextProps) {
  return (
    <div className="relative shrink-0">
      <Text text={text} />
    </div>
  );
}
type StatusProps = {
  className?: string;
  cardIcons?: "status" | "Location" | "Days to fix" | "Confidence" | "case" | "more" | "Certainty";
};

function Status({ className, cardIcons = "status" }: StatusProps) {
  const isCase = cardIcons === "case";
  const isCertainty = cardIcons === "Certainty";
  const isConfidence = cardIcons === "Confidence";
  const isDaysToFix = cardIcons === "Days to fix";
  const isLocation = cardIcons === "Location";
  const isMore = cardIcons === "more";
  return (
    <div className={className || `relative ${isCertainty ? "w-[22px]" : isMore ? "size-[24px]" : ["Location", "Days to fix", "Confidence", "case"].includes(cardIcons) ? "size-[16px]" : "size-[20px]"}`}>
      {["status", "Location", "Days to fix", "Confidence", "case", "more"].includes(cardIcons) && (
        <div className={`absolute ${isMore ? "inset-[41.67%_12.5%]" : isCase ? "inset-[12.5%_8.33%_16.67%_8.33%]" : isConfidence ? "inset-[8.33%]" : isDaysToFix ? "inset-[34.38%_6.25%]" : isLocation ? "inset-[24.92%_37.91%_50.08%_37.09%]" : "inset-[9.39%_9.39%_15.01%_15.01%]"}`} data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox={isMore ? "0 0 18 4" : isCase ? "0 0 13.3333 11.3333" : isConfidence ? "0 0 13.3333 13.3333" : isDaysToFix ? "0 0 14 5" : isLocation ? "0 0 4 4" : "0 0 15.1208 15.1198"}>
            <path clipRule={isCase ? "evenodd" : undefined} d={isMore ? svgPaths.p11907800 : isCase ? svgPaths.p24fa7e80 : isConfidence ? svgPaths.p236cb4c0 : isDaysToFix ? svgPaths.p256a6080 : isLocation ? svgPaths.p5b9dc80 : svgPaths.p3d7ed280} fill={isMore ? "var(--fill-0, #4B5563)" : "var(--fill-0, #F7F9FB)"} fillRule={isCase ? "evenodd" : undefined} id="Vector" />
          </svg>
        </div>
      )}
      {["Location", "Days to fix"].includes(cardIcons) && (
        <div className={`absolute ${isDaysToFix ? "inset-[46.88%_37.5%_46.88%_18.75%]" : "inset-[3.44%_16.44%_5.18%_15.63%]"}`} data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox={isDaysToFix ? "0 0 7 1" : "0 0 10.8696 14.6219"}>
            <path d={isDaysToFix ? "M0 0H7V1H0V0Z" : svgPaths.p2ef45c00} fill="var(--fill-0, #F7F9FB)" id="Vector" />
          </svg>
        </div>
      )}
      {isCertainty && (
        <div className="content-stretch flex flex-col items-start p-[2px] relative w-full">
          <div className="h-[16px] relative shrink-0 w-[18px]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 16">
              <g id="Vector">
                <path d={svgPaths.p563ec00} fill="var(--fill-0, black)" />
                <path d={svgPaths.p563ec00} fill="var(--fill-1, #E6EDF2)" />
              </g>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
type SubtractProps = {
  className?: string;
  property1?: "new" | "review" | "done" | "overdue";
};

function Subtract({ className, property1 = "new" }: SubtractProps) {
  const isDone = property1 === "done";
  const isOverdue = property1 === "overdue";
  const isReview = property1 === "review";
  return (
    <div className={className || "h-[34.37px] relative w-[28px]"}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.001 34.3701">
        <path d={isOverdue ? svgPaths.p4914100 : isDone ? svgPaths.p16861f80 : isReview ? svgPaths.p3b980b00 : svgPaths.p37acf300} fill={isOverdue ? "var(--fill-0, #E040FB)" : isDone ? "var(--fill-0, #66BB6A)" : isReview ? "var(--fill-0, #B5E743)" : "var(--fill-0, #E7F100)"} id="Subtract" />
      </svg>
    </div>
  );
}
type PriorityProps = {
  className?: string;
  property1?: boolean;
};

function Priority({ className, property1 = false }: PriorityProps) {
  const isProperty1 = property1;
  return (
    <div className={className || `relative rounded-[33px] ${isProperty1 ? "bg-[#4b5563]" : ""}`}>
      <div aria-hidden="true" className="absolute border-2 border-[#4b5563] border-solid inset-0 pointer-events-none rounded-[33px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[20px] py-[6px] relative">
          <p className={`capitalize font-["Inter:Bold",sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[18px] text-center whitespace-nowrap ${isProperty1 ? "text-[#e6edf2]" : "text-[#4b5563]"}`}>Priority</p>
        </div>
      </div>
    </div>
  );
}
type UserProps = {
  className?: string;
  property1?: "Leo" | "Stephen" | "Samira" | "Rajesh" | "Unknown User";
};

function User({ className, property1 = "Leo" }: UserProps) {
  const isUnknownUser = property1 === "Unknown User";
  return (
    <div className={className || "relative size-[24px]"}>
      <div className="absolute left-0 size-[24px] top-0">
        {["Leo", "Stephen", "Samira", "Rajesh"].includes(property1) && <img alt="" className="absolute block max-w-none size-full" height="24" src={property1 === "Rajesh" ? imgEllipse18 : property1 === "Samira" ? imgEllipse17 : property1 === "Stephen" ? imgEllipse16 : imgEllipse15} width="24" />}
        {isUnknownUser && (
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" fill="var(--fill-0, #C4C4C4)" id="Ellipse 15" r="11.5" stroke="var(--stroke-0, #E6EDF2)" />
          </svg>
        )}
      </div>
      {isUnknownUser && (
        <div className="absolute inset-[8.72%_8.33%_7.95%_8.33%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <path clipRule="evenodd" d={svgPaths.p3b039800} fill="var(--fill-0, #4B5563)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-white relative size-full" data-name="Home">
      <div className="absolute bg-[#4b5563] bottom-[-0.44px] h-[34px] left-[-0.14%] overflow-clip right-[-0.11%]" data-name="bar/home/lit">
        <div className="absolute h-[34px] left-0 top-0 w-[375px]" data-name="frm" />
        <div className="-translate-x-1/2 absolute bg-[#e6edf2] bottom-[9px] h-[5px] left-[calc(50%+0.5px)] rounded-[5px] w-[134px]" data-name="indicator" />
      </div>
      <div className="-translate-y-1/2 absolute bg-[rgba(196,196,196,0.2)] h-[123px] left-0 overflow-clip right-[-0.25%] top-[calc(50%-364.06px)]" data-name="Top Hero Bar">
        <div className="-translate-y-1/2 absolute capitalize flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] left-[15.09px] not-italic text-[#4b5563] text-[24px] top-[86px] whitespace-nowrap">
          <p className="leading-[normal]">Home</p>
        </div>
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
      <div className="absolute bottom-[34px] h-[54px] left-0 right-0" data-name="Mobile Nav Bar Stephen">
        <div className="absolute bg-[#4b5563] inset-0" data-name="User/Mobile Nav Bar Leo">
          <div className="gap-x-[10px] gap-y-[10px] grid grid-cols-[repeat(5,minmax(0,1fr))] grid-rows-[repeat(1,fit-content(100%))] px-[20px] relative size-full">
            <div className="bg-[#f7f9fb] col-1 relative rounded-bl-[10px] rounded-br-[10px] row-1 self-stretch shrink-0 w-[48px]" data-name="Nav Item Mobile">
              <div className="flex flex-col items-center justify-center size-full">
                <div className="content-stretch flex flex-col items-center justify-center py-[9px] relative size-full">
                  <div className="relative shrink-0 size-[24px]" data-name="Home">
                    <div className="absolute h-[24px] left-0 right-0 top-0" data-name="Vector">
                      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                        <path d={svgPaths.p1bb9a500} fill="var(--fill-0, #4B5563)" id="Vector" />
                      </svg>
                    </div>
                  </div>
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-w-full not-italic relative shrink-0 text-[#4b5563] text-[10px] text-center w-[min-content]">home</p>
                </div>
              </div>
            </div>
            <div className="bg-[#4b5563] col-2 relative row-1 self-stretch shrink-0 w-[48px]" data-name="Nav Item Mobile">
              <div className="flex flex-col items-center size-full">
                <div className="content-stretch flex flex-col items-center py-[9px] relative size-full">
                  <div className="relative shrink-0 size-[24px]" data-name="My Roads">
                    <div className="content-stretch flex flex-col items-start relative size-full">
                      <div className="h-[24px] relative shrink-0 w-[28px]" data-name="Vector">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 24">
                          <path d={svgPaths.p3a571a80} fill="var(--fill-0, #E6EDF2)" id="Vector" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-w-full not-italic relative shrink-0 text-[#e6edf2] text-[10px] text-center w-[min-content]">roads</p>
                </div>
              </div>
            </div>
            <div className="bg-[#4b5563] col-3 relative row-1 self-stretch shrink-0 w-[48px]" data-name="Nav Item Mobile">
              <div className="flex flex-col items-center justify-center size-full">
                <div className="content-stretch flex flex-col items-center justify-center py-[9px] relative size-full">
                  <div className="relative shrink-0 size-[24px]" data-name="Teams">
                    <div className="content-stretch flex flex-col items-start py-[4px] relative size-full">
                      <div className="h-[17.5px] relative shrink-0 w-[20.571px]" data-name="Vector">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.5714 17.5">
                          <path d={svgPaths.p369836f0} fill="var(--fill-0, #E6EDF2)" id="Vector" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-w-full not-italic relative shrink-0 text-[#e6edf2] text-[10px] text-center w-[min-content]">teams</p>
                </div>
              </div>
            </div>
            <div className="bg-[#4b5563] col-4 relative row-1 self-stretch shrink-0 w-[48px]" data-name="Nav Item Mobile">
              <div className="flex flex-col items-center justify-center size-full">
                <div className="content-stretch flex flex-col items-center justify-center py-[9px] relative size-full">
                  <div className="relative shrink-0 size-[24px]" data-name="Chats">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 25">
                      <g id="Group 1017">
                        <path d={svgPaths.p3b35c380} fill="var(--fill-0, #E6EDF2)" id="Vector" />
                        <ellipse cx="22.5144" cy="4.71903" fill="var(--fill-0, #19B29B)" id="Ellipse 16" rx="3.4856" ry="3.64583" />
                      </g>
                    </svg>
                  </div>
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-w-full not-italic relative shrink-0 text-[#e6edf2] text-[10px] text-center w-[min-content]">chats</p>
                </div>
              </div>
            </div>
            <div className="bg-[#4b5563] col-5 relative row-1 self-stretch shrink-0 w-[48px]" data-name="Nav Item Mobile">
              <div className="flex flex-col items-center justify-center size-full">
                <div className="content-stretch flex flex-col items-center justify-center py-[9px] relative size-full">
                  <User className="relative shrink-0 size-[24px]" property1="Stephen" />
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-w-full not-italic relative shrink-0 text-[#e6edf2] text-[10px] text-center w-[min-content]">Stephen</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-[15px] top-[157px] w-[375px]" data-name="Filters">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[9px] items-center relative">
            <Priority className="bg-[#4b5563] relative rounded-[33px] shrink-0" property1 />
            <div className="relative rounded-[33px] shrink-0" data-name="Priority">
              <div aria-hidden="true" className="absolute border-2 border-[#4b5563] border-solid inset-0 pointer-events-none rounded-[33px]" />
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex items-center justify-center px-[20px] py-[6px] relative">
                  <p className="capitalize font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#4b5563] text-[18px] text-center whitespace-nowrap">location</p>
                </div>
              </div>
            </div>
            <div className="relative rounded-[33px] shrink-0" data-name="Priority">
              <div aria-hidden="true" className="absolute border-2 border-[#4b5563] border-solid inset-0 pointer-events-none rounded-[33px]" />
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex items-center justify-center px-[20px] py-[6px] relative">
                  <p className="capitalize font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#4b5563] text-[18px] text-center whitespace-nowrap">Status</p>
                </div>
              </div>
            </div>
            <div className="relative rounded-[33px] shrink-0" data-name="Priority">
              <div aria-hidden="true" className="absolute border-2 border-[#4b5563] border-solid inset-0 pointer-events-none rounded-[33px]" />
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex items-center justify-center px-[20px] py-[6px] relative">
                  <p className="capitalize font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#4b5563] text-[18px] text-center whitespace-nowrap">Types</p>
                </div>
              </div>
            </div>
            <div className="relative rounded-[33px] shrink-0" data-name="Priority">
              <div aria-hidden="true" className="absolute border-2 border-[#4b5563] border-solid inset-0 pointer-events-none rounded-[33px]" />
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex items-center justify-center px-[20px] py-[6px] relative">
                  <p className="capitalize font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#4b5563] text-[18px] text-center whitespace-nowrap">Arrival date</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-[16px] top-[118px]" data-name="Subheadings">
        <Text text="filters" />
      </div>
      <div className="absolute h-[562px] left-[18.5px] top-[191px] w-[360px]">
        <div className="content-stretch flex flex-col items-start relative size-full">
          <Frame1075SubheadingsText text="urgent" />
          <div className="content-stretch flex gap-[10px] items-center overflow-x-auto overflow-y-clip relative shrink-0 w-full">
            <div className="relative shrink-0 w-[175px]" data-name="Defect Card">
              <div className="content-stretch flex flex-col items-start relative w-full">
                <Frame1075Image />
                <Text1 text="89%" text1="review" />
              </div>
            </div>
            <div className="relative shrink-0 w-[175px]" data-name="Defect Card">
              <div className="content-stretch flex flex-col items-start relative w-full">
                <div className="h-[130px] overflow-clip relative shrink-0 w-full">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFrame1040} />
                  <Subtract className="absolute h-[34.37px] left-[137px] top-[-1px] w-[28px]" property1="review" />
                </div>
                <div className="bg-[#4b5563] relative shrink-0 w-full">
                  <div className="content-stretch flex flex-col items-start p-[6px] relative w-full">
                    <Frame1075Text text="Debris?">75%</Frame1075Text>
                    <Frame1075LabelText text="case 2026_02_19_218" />
                    <Label />
                    <div className="content-stretch flex gap-[58px] items-center justify-end pb-px relative shrink-0 w-full">
                      <Label1 />
                      <div className="flex flex-row items-center self-stretch">
                        <div className="bg-[#f7f9fb] h-full relative rounded-[18px] shrink-0" data-name="Label">
                          <div className="flex flex-row items-center size-full">
                            <div className="content-stretch flex h-full items-center px-[12px] py-[6px] relative">
                              <div className="relative shrink-0" data-name="Status">
                                <Frame1075Text1 text="review" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative shrink-0 w-[175px]" data-name="Defect Card">
              <div className="content-stretch flex flex-col items-start relative w-full">
                <Frame1075Image />
                <div className="bg-[#4b5563] relative shrink-0 w-full">
                  <div className="content-stretch flex flex-col items-start p-[6px] relative w-full">
                    <Frame1075Text text="Leak?">92%</Frame1075Text>
                    <Frame1075LabelText text="case 2026_02_19_219" />
                    <div className="relative rounded-[18px] shrink-0" data-name="Label">
                      <div className="flex flex-row items-center size-full">
                        <div className="content-stretch flex gap-[4px] items-center px-[4px] py-[2px] relative">
                          <Status cardIcons="Days to fix" className="overflow-clip relative shrink-0 size-[20px]" />
                          <StatusText text="10 days to fix" />
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex gap-[58px] items-center justify-end pb-px relative shrink-0 w-full">
                      <div className="relative rounded-[18px] shrink-0" data-name="Label">
                        <div className="flex flex-row items-center size-full">
                          <div className="content-stretch flex gap-[4px] items-center px-[4px] py-[2px] relative">
                            <Status cardIcons="Location" className="overflow-clip relative shrink-0 size-[20px]" />
                            <StatusText text="B12" additionalClassNames="opacity-40" />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row items-center self-stretch">
                        <div className="bg-[#f7f9fb] h-full relative rounded-[18px] shrink-0" data-name="Label">
                          <div className="flex flex-row items-center size-full">
                            <div className="content-stretch flex h-full items-center px-[12px] py-[6px] relative">
                              <div className="relative shrink-0" data-name="Status">
                                <Frame1075Text1 text="review" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative shrink-0 w-[175px]" data-name="Defect Card">
              <div className="content-stretch flex flex-col items-start relative w-full">
                <div className="h-[130px] overflow-clip relative shrink-0 w-full">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFrame1040} />
                  <Subtract className="absolute h-[34.37px] left-[137px] top-[-1px] w-[28px]" property1="review" />
                </div>
                <div className="bg-[#4b5563] relative shrink-0 w-full">
                  <div className="content-stretch flex flex-col items-start p-[6px] relative w-full">
                    <Frame1075Text text="Faulty Sensor?">80%</Frame1075Text>
                    <Frame1075LabelText text="case 2026_02_19_220" />
                    <div className="relative rounded-[18px] shrink-0" data-name="Label">
                      <div className="flex flex-row items-center size-full">
                        <div className="content-stretch flex gap-[4px] items-center px-[4px] py-[2px] relative">
                          <Status cardIcons="Days to fix" className="overflow-clip relative shrink-0 size-[20px]" />
                          <StatusText text="5 days to fix" />
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex gap-[58px] items-center justify-end pb-px relative shrink-0 w-full">
                      <div className="relative rounded-[18px] shrink-0" data-name="Label">
                        <div className="flex flex-row items-center size-full">
                          <div className="content-stretch flex gap-[4px] items-center px-[4px] py-[2px] relative">
                            <Status cardIcons="Location" className="overflow-clip relative shrink-0 size-[20px]" />
                            <StatusText text="C15" additionalClassNames="opacity-40" />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row items-center self-stretch">
                        <div className="bg-[#f7f9fb] h-full relative rounded-[18px] shrink-0" data-name="Label">
                          <div className="flex flex-row items-center size-full">
                            <div className="content-stretch flex h-full items-center px-[12px] py-[6px] relative">
                              <div className="relative shrink-0" data-name="Status">
                                <Frame1075Text1 text="review" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Frame1075SubheadingsText text="High" />
          <div className="content-stretch flex gap-[10px] items-center overflow-x-auto overflow-y-clip relative shrink-0 w-full">
            <div className="relative shrink-0 w-[175px]" data-name="Defect Card">
              <div className="content-stretch flex flex-col items-start relative w-full">
                <div className="h-[130px] overflow-clip relative shrink-0 w-full">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFrame1041} />
                  <Subtract className="absolute h-[34.37px] left-[137px] top-[-1px] w-[28px]" property1="review" />
                </div>
                <div className="bg-[#4b5563] relative shrink-0 w-full">
                  <div className="content-stretch flex flex-col items-start p-[6px] relative w-full">
                    <Frame1075Text text="Missing Studs?">40%</Frame1075Text>
                    <Frame1075LabelText text="case 2026_03_30_117" />
                    <div className="relative rounded-[18px] shrink-0" data-name="Label">
                      <div className="flex flex-row items-center size-full">
                        <div className="content-stretch flex gap-[4px] items-center px-[4px] py-[2px] relative">
                          <Status cardIcons="Days to fix" className="overflow-clip relative shrink-0 size-[20px]" />
                          <StatusText text="30 days to fix" />
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex gap-[58px] items-center justify-end pb-px relative shrink-0 w-full">
                      <Label1 />
                      <div className="flex flex-row items-center self-stretch">
                        <div className="bg-[#f7f9fb] h-full relative rounded-[18px] shrink-0" data-name="Label">
                          <div className="flex flex-row items-center size-full">
                            <div className="content-stretch flex h-full items-center px-[12px] py-[6px] relative">
                              <div className="relative shrink-0" data-name="Status">
                                <Frame1075Text1 text="review" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative shrink-0 w-[175px]" data-name="Defect Card">
              <div className="content-stretch flex flex-col items-start relative w-full">
                <div className="h-[130px] overflow-clip relative shrink-0 w-full">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFrame1042} />
                  <Subtract className="absolute h-[34.37px] left-[137px] top-[-1px] w-[28px]" property1="review" />
                </div>
                <Text1 text="75%" text1="review" />
              </div>
            </div>
            <div className="relative shrink-0 w-[175px]" data-name="Defect Card">
              <div className="content-stretch flex flex-col items-start relative w-full">
                <div className="h-[130px] overflow-clip relative shrink-0 w-full">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFrame1041} />
                  <Subtract className="absolute h-[34.37px] left-[137px] top-[-1px] w-[28px]" property1="review" />
                </div>
                <div className="bg-[#4b5563] relative shrink-0 w-full">
                  <div className="content-stretch flex flex-col items-start p-[6px] relative w-full">
                    <Frame1075Text text="Warping Issues?">60%</Frame1075Text>
                    <Frame1075LabelText text="case 2026_04_10_322" />
                    <div className="relative rounded-[18px] shrink-0" data-name="Label">
                      <div className="flex flex-row items-center size-full">
                        <div className="content-stretch flex gap-[4px] items-center px-[4px] py-[2px] relative">
                          <Status cardIcons="Days to fix" className="overflow-clip relative shrink-0 size-[20px]" />
                          <StatusText text="25 days to fix" />
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex gap-[58px] items-center justify-end pb-px relative shrink-0 w-full">
                      <div className="relative rounded-[18px] shrink-0" data-name="Label">
                        <div className="flex flex-row items-center size-full">
                          <div className="content-stretch flex gap-[4px] items-center px-[4px] py-[2px] relative">
                            <Status cardIcons="Location" className="overflow-clip relative shrink-0 size-[20px]" />
                            <StatusText text="B22" additionalClassNames="opacity-40" />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row items-center self-stretch">
                        <div className="bg-[#f7f9fb] h-full relative rounded-[18px] shrink-0" data-name="Label">
                          <div className="flex flex-row items-center size-full">
                            <div className="content-stretch flex h-full items-center px-[12px] py-[6px] relative">
                              <div className="relative shrink-0" data-name="Status">
                                <Frame1075Text1 text="review" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative shrink-0 w-[175px]" data-name="Defect Card">
              <div className="content-stretch flex flex-col items-start relative w-full">
                <div className="h-[130px] overflow-clip relative shrink-0 w-full">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFrame1042} />
                  <Subtract className="absolute h-[34.37px] left-[137px] top-[-1px] w-[28px]" property1="review" />
                </div>
                <div className="bg-[#4b5563] relative shrink-0 w-full">
                  <div className="content-stretch flex flex-col items-start p-[6px] relative w-full">
                    <Frame1075Text text="Surface Scratches?">50%</Frame1075Text>
                    <Frame1075LabelText text="case 2026_05_15_445" />
                    <div className="relative rounded-[18px] shrink-0" data-name="Label">
                      <div className="flex flex-row items-center size-full">
                        <div className="content-stretch flex gap-[4px] items-center px-[4px] py-[2px] relative">
                          <Status cardIcons="Days to fix" className="overflow-clip relative shrink-0 size-[20px]" />
                          <StatusText text="20 days to fix" />
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex gap-[58px] items-center justify-end pb-px relative shrink-0 w-full">
                      <div className="relative rounded-[18px] shrink-0" data-name="Label">
                        <div className="flex flex-row items-center size-full">
                          <div className="content-stretch flex gap-[4px] items-center px-[4px] py-[2px] relative">
                            <Status cardIcons="Location" className="overflow-clip relative shrink-0 size-[20px]" />
                            <StatusText text="B22" additionalClassNames="opacity-40" />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row items-center self-stretch">
                        <div className="bg-[#f7f9fb] h-full relative rounded-[18px] shrink-0" data-name="Label">
                          <div className="flex flex-row items-center size-full">
                            <div className="content-stretch flex h-full items-center px-[12px] py-[6px] relative">
                              <div className="relative shrink-0" data-name="Status">
                                <Frame1075Text1 text="review" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Frame1075SubheadingsText text="Medium" />
          <div className="content-stretch flex gap-[10px] items-center overflow-x-auto overflow-y-clip relative shrink-0 w-full">
            <div className="relative shrink-0 w-[175px]" data-name="Defect Card">
              <div className="content-stretch flex flex-col items-start relative w-full">
                <div className="h-[130px] overflow-clip relative shrink-0 w-full">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFrame1043} />
                  <Subtract className="absolute h-[34.37px] left-[137px] top-[-1px] w-[28px]" property1="overdue" />
                </div>
                <div className="bg-[#4b5563] relative shrink-0 w-full">
                  <div className="content-stretch flex flex-col items-start p-[6px] relative w-full">
                    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[12px] text-white whitespace-pre">{`  R. Marks miss..?`}</p>
                      <div className="relative rounded-[18px] shrink-0" data-name="Label">
                        <div className="flex flex-row items-center size-full">
                          <div className="content-stretch flex gap-[4px] items-center px-[4px] py-[2px] relative">
                            <Status cardIcons="Certainty" className="relative shrink-0 w-[20px]" />
                            <StatusText text="81%" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <Frame1075LabelText text="case 2026_02_19_218" />
                    <Label />
                    <div className="content-stretch flex gap-[58px] items-center justify-end pb-px relative shrink-0 w-full">
                      <Label1 />
                      <div className="flex flex-row items-center self-stretch">
                        <div className="bg-[#f7f9fb] h-full relative rounded-[18px] shrink-0" data-name="Label">
                          <div className="flex flex-row items-center size-full">
                            <div className="content-stretch flex h-full items-center px-[12px] py-[6px] relative">
                              <div className="relative shrink-0" data-name="Status">
                                <Frame1075Text1 text="review" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative shrink-0 w-[175px]" data-name="Defect Card">
              <div className="content-stretch flex flex-col items-start relative w-full">
                <div className="h-[130px] overflow-clip relative shrink-0 w-full">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFrame1044} />
                  <Subtract className="absolute h-[34.37px] left-[137px] top-[-1px] w-[28px]" />
                </div>
                <div className="bg-[#4b5563] relative shrink-0 w-full">
                  <div className="content-stretch flex flex-col items-start p-[6px] relative w-full">
                    <Frame1075Text text="No Studs?">75%</Frame1075Text>
                    <Frame1075LabelText text="case 2026_02_19_218" />
                    <Label />
                    <div className="content-stretch flex gap-[58px] items-center justify-end pb-px relative shrink-0 w-full">
                      <Label1 />
                      <div className="flex flex-row items-center self-stretch">
                        <div className="bg-[#f7f9fb] h-full relative rounded-[18px] shrink-0" data-name="Label">
                          <div className="flex flex-row items-center size-full">
                            <div className="content-stretch flex h-full items-center px-[12px] py-[6px] relative">
                              <div className="relative shrink-0" data-name="Status">
                                <Frame1075Text1 text="review" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative shrink-0 w-[175px]" data-name="Defect Card">
              <div className="content-stretch flex flex-col items-start relative w-full">
                <div className="h-[130px] overflow-clip relative shrink-0 w-full">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFrame1043} />
                  <Subtract className="absolute h-[34.37px] left-[137px] top-[-1px] w-[28px]" property1="overdue" />
                </div>
                <div className="bg-[#4b5563] relative shrink-0 w-full">
                  <div className="content-stretch flex flex-col items-start p-[6px] relative w-full">
                    <Frame1075Text text="Missing Data">90%</Frame1075Text>
                    <Frame1075LabelText text="case 2026_02_20_219" />
                    <div className="relative rounded-[18px] shrink-0" data-name="Label">
                      <div className="flex flex-row items-center size-full">
                        <div className="content-stretch flex gap-[4px] items-center px-[4px] py-[2px] relative">
                          <Status cardIcons="Days to fix" className="overflow-clip relative shrink-0 size-[20px]" />
                          <StatusText text="10 days to fix" />
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex gap-[58px] items-center justify-end pb-px relative shrink-0 w-full">
                      <div className="relative rounded-[18px] shrink-0" data-name="Label">
                        <div className="flex flex-row items-center size-full">
                          <div className="content-stretch flex gap-[4px] items-center px-[4px] py-[2px] relative">
                            <Status cardIcons="Location" className="overflow-clip relative shrink-0 size-[20px]" />
                            <StatusText text="B27" additionalClassNames="opacity-40" />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row items-center self-stretch">
                        <div className="bg-[#f7f9fb] h-full relative rounded-[18px] shrink-0" data-name="Label">
                          <div className="flex flex-row items-center size-full">
                            <div className="content-stretch flex h-full items-center px-[12px] py-[6px] relative">
                              <div className="relative shrink-0" data-name="Status">
                                <Frame1075Text1 text="review" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative shrink-0 w-[175px]" data-name="Defect Card">
              <div className="content-stretch flex flex-col items-start relative w-full">
                <div className="h-[130px] overflow-clip relative shrink-0 w-full">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFrame1044} />
                  <Subtract className="absolute h-[34.37px] left-[137px] top-[-1px] w-[28px]" />
                </div>
                <div className="bg-[#4b5563] relative shrink-0 w-full">
                  <div className="content-stretch flex flex-col items-start p-[6px] relative w-full">
                    <Frame1075Text text="Field Error">67%</Frame1075Text>
                    <Frame1075LabelText text="case 2026_02_20_220" />
                    <div className="relative rounded-[18px] shrink-0" data-name="Label">
                      <div className="flex flex-row items-center size-full">
                        <div className="content-stretch flex gap-[4px] items-center px-[4px] py-[2px] relative">
                          <Status cardIcons="Days to fix" className="overflow-clip relative shrink-0 size-[20px]" />
                          <StatusText text="22 days to fix" />
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex gap-[58px] items-center justify-end pb-px relative shrink-0 w-full">
                      <div className="relative rounded-[18px] shrink-0" data-name="Label">
                        <div className="flex flex-row items-center size-full">
                          <div className="content-stretch flex gap-[4px] items-center px-[4px] py-[2px] relative">
                            <Status cardIcons="Location" className="overflow-clip relative shrink-0 size-[20px]" />
                            <StatusText text="C32" additionalClassNames="opacity-40" />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row items-center self-stretch">
                        <div className="bg-[#f7f9fb] h-full relative rounded-[18px] shrink-0" data-name="Label">
                          <div className="flex flex-row items-center size-full">
                            <div className="content-stretch flex h-full items-center px-[12px] py-[6px] relative">
                              <div className="relative shrink-0" data-name="Status">
                                <Frame1075Text1 text="review" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Frame1075SubheadingsText text="Low" />
          <div className="content-stretch flex gap-[10px] items-center overflow-x-auto overflow-y-clip relative shrink-0 w-full">
            <div className="relative shrink-0 w-[175px]" data-name="Defect Card">
              <div className="content-stretch flex flex-col items-start relative w-full">
                <div className="h-[130px] overflow-clip relative shrink-0 w-full">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFrame1045} />
                  <Subtract className="absolute h-[34.37px] left-[137px] top-[-1px] w-[28px]" />
                </div>
                <Text1 text="75%" text1="review" />
              </div>
            </div>
            <div className="relative shrink-0 w-[175px]" data-name="Defect Card">
              <div className="content-stretch flex flex-col items-start relative w-full">
                <div className="h-[130px] overflow-clip relative shrink-0 w-full">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFrame1045} />
                  <Subtract className="absolute h-[34.37px] left-[137px] top-[-1px] w-[28px]" />
                </div>
                <Text1 text="75%" text1="review" />
              </div>
            </div>
            <div className="relative shrink-0 w-[175px]" data-name="Defect Card">
              <div className="content-stretch flex flex-col items-start relative w-full">
                <div className="h-[130px] overflow-clip relative shrink-0 w-full">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFrame1045} />
                  <Subtract className="absolute h-[34.37px] left-[137px] top-[-1px] w-[28px]" />
                </div>
                <Text1 text="75%" text1="review" />
              </div>
            </div>
            <div className="relative shrink-0 w-[175px]" data-name="Defect Card">
              <div className="content-stretch flex flex-col items-start relative w-full">
                <div className="h-[130px] overflow-clip relative shrink-0 w-full">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFrame1045} />
                  <Subtract className="absolute h-[34.37px] left-[137px] top-[-1px] w-[28px]" />
                </div>
                <Text1 text="75%" text1="review" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}