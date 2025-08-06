import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

interface BookerProps {}

export default function Booker({}: BookerProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"free-call"});
      cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, [])
  return null; // This component will not render anything visible
};
