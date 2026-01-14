function Frame() {
  return <div className="[grid-area:1_/_1] bg-[#fababa] min-h-[100px] min-w-[100px] place-self-stretch shrink-0" />;
}

function Frame1() {
  return <div className="[grid-area:1_/_2] bg-[#fababa] min-h-[100px] min-w-[100px] place-self-stretch shrink-0" />;
}

function Frame8() {
  return <div className="[grid-area:1_/_3] bg-[#fababa] min-h-[100px] min-w-[100px] place-self-stretch shrink-0" />;
}

function Frame12() {
  return <div className="[grid-area:1_/_4] bg-[#fababa] min-h-[100px] min-w-[100px] place-self-stretch shrink-0" />;
}

function Frame2() {
  return <div className="[grid-area:2_/_1] bg-[#fababa] min-h-[100px] min-w-[100px] place-self-stretch shrink-0" />;
}

function Frame3() {
  return <div className="[grid-area:2_/_2] bg-[#fababa] min-h-[100px] min-w-[100px] place-self-stretch shrink-0" />;
}

function Frame10() {
  return <div className="[grid-area:2_/_3] bg-[#fababa] min-h-[100px] min-w-[100px] place-self-stretch shrink-0" />;
}

function Frame14() {
  return <div className="[grid-area:2_/_4] bg-[#fababa] min-h-[100px] min-w-[100px] place-self-stretch shrink-0" />;
}

function Frame4() {
  return <div className="[grid-area:3_/_1] bg-[#fababa] min-h-[100px] min-w-[100px] place-self-stretch shrink-0" />;
}

function Frame6() {
  return <div className="[grid-area:3_/_2] bg-[#fababa] min-h-[100px] min-w-[100px] place-self-stretch shrink-0" />;
}

function Frame9() {
  return <div className="[grid-area:3_/_3] bg-[#fababa] min-h-[100px] min-w-[100px] place-self-stretch shrink-0" />;
}

function Frame13() {
  return <div className="[grid-area:3_/_4] bg-[#fababa] min-h-[100px] min-w-[100px] place-self-stretch shrink-0" />;
}

function Frame5() {
  return <div className="[grid-area:4_/_1] bg-[#fababa] min-h-[100px] min-w-[100px] place-self-stretch shrink-0" />;
}

function Frame7() {
  return <div className="[grid-area:4_/_2] bg-[#fababa] min-h-[100px] min-w-[100px] place-self-stretch shrink-0" />;
}

function Frame11() {
  return <div className="[grid-area:4_/_3] bg-[#fababa] min-h-[100px] min-w-[100px] place-self-stretch shrink-0" />;
}

function Frame15() {
  return <div className="[grid-area:4_/_4] bg-[#fababa] min-h-[100px] min-w-[100px] place-self-stretch shrink-0" />;
}

function Frame16() {
  return (
    <div className="basis-0 gap-[20px] grid grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(4,_minmax(0px,_1fr))] grow min-h-px min-w-px relative shrink-0 w-full">
      <Frame />
      <Frame1 />
      <Frame8 />
      <Frame12 />
      <Frame2 />
      <Frame3 />
      <Frame10 />
      <Frame14 />
      <Frame4 />
      <Frame6 />
      <Frame9 />
      <Frame13 />
      <Frame5 />
      <Frame7 />
      <Frame11 />
      <Frame15 />
    </div>
  );
}

function Desktop() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col inset-0 items-center p-[20px]" data-name="desktop">
      <Frame16 />
    </div>
  );
}

export default function Desktop1() {
  return (
    <div className="bg-white relative size-full" data-name="Desktop">
      <Desktop />
    </div>
  );
}