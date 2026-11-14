import React, { useEffect } from "react";

const CONTAINER_ID = "container-cc77b4113ecbb38adcefcdc594632a11";
const SCRIPT_SRC =
  "https://bauval.org/21/cc77b4113ecbb38adcefcdc594632a11";

export default function NativeAd() {
  useEffect(() => {
    if (document.querySelector(`script[data-native-ad="ftt"]`)) return;
    const s = document.createElement("script");
    s.async = true;
    s.dataset.cfasync = "false";
    s.dataset.nativeAd = "ftt";
    s.src = SCRIPT_SRC;
    document.body.appendChild(s);
  }, []);

  return (
    <div className="flex justify-center my-4 min-h-[50px] w-full overflow-hidden">
      <div id={CONTAINER_ID} />
    </div>
  );
}