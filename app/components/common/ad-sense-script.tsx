import { useEffect } from "react";

export default function AdSenseScript() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7338574251336623";
    script.async = true;
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}
