function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center justify-center size-full">
      <div className="content-stretch flex items-center justify-center px-[20px] py-[6px] relative">{children}</div>
    </div>
  );
}
type FiltersPriorityTextProps = {
  text: string;
};

function FiltersPriorityText({ text }: FiltersPriorityTextProps) {
  return (
    <div className="relative rounded-[33px] shrink-0">
      <div aria-hidden="true" className="absolute border-2 border-[#4b5563] border-solid inset-0 pointer-events-none rounded-[33px]" />
      <Wrapper>
        <p className="capitalize font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#4b5563] text-[18px] text-center whitespace-nowrap">{text}</p>
      </Wrapper>
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
      <Wrapper>
        <p className={`capitalize font-["Inter:Bold",sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[18px] text-center whitespace-nowrap ${isProperty1 ? "text-[#e6edf2]" : "text-[#4b5563]"}`}>Priority</p>
      </Wrapper>
    </div>
  );
}

export default function Filters() {
  return (
    <div className="relative size-full" data-name="Filters">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[9px] items-center relative">
          <Priority className="bg-[#4b5563] relative rounded-[33px] shrink-0" property1 />
          <FiltersPriorityText text="location" />
          <FiltersPriorityText text="Status" />
          <FiltersPriorityText text="Types" />
          <FiltersPriorityText text="Arrival date" />
        </div>
      </div>
    </div>
  );
}