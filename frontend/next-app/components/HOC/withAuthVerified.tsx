import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import verifyToken from "../../services/verifyToken";

const withAuthVerified = (WrappedComponent: React.ComponentType) => {
  return (props: React.ComponentProps<any>) => {
    const Router = useRouter();
    const [verified, setVerified] = useState(false);

    useEffect(() => {
      async () => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          Router.replace("/");
        } else {
          const data = await verifyToken(accessToken);
          if (data.verified) {
            setVerified(data.verified);
          } else {
            localStorage.removeItem("accessToken");
            Router.replace("/");
          }
        }
      };
    }, []);

    if (verified) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
};

export default withAuthVerified;
// https://imjulianeral.github.io/next-shield/docs/props/isAuth