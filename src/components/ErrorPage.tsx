"use client"
import errorMessages from "@/lib/errorMessages";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

interface ErrorProps {
  errorCode: number;
  errorMessage?: string;
}

const styles: { [key: string]: React.CSSProperties } = {
  error: {
    fontFamily: 'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
    height: "100vh",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  desc: {
    display: "inline-block",
  },
  h1: {
    display: "inline-block",
    margin: "0 20px 0 0",
    padding: "0 23px 0 0",
    fontSize: 24,
    fontWeight: 500,
    verticalAlign: "top",
    lineHeight: "49px",
    borderRight: "1px solid rgba(0, 0, 0, 0.3)",
  },
  h2: {
    fontSize: 17,
    fontWeight: 400,
    lineHeight: "49px",
    margin: 0,
  },
};

const ErrorPage: React.FC<ErrorProps> = ({ errorCode, errorMessage }) => {
  const router = useRouter();

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      toast("Redirecting to home page...", { icon: "🏠" });
      router.push("/");
    }, 3000);

    return () => clearTimeout(redirectTimeout);
  }, [router]);

  const defaultMessage = errorMessages[errorCode]?.message || "An unexpected error occurred";
  const messageInfo = errorMessages[errorCode]?.info || "Sorry, no further information available.";

  const message = errorMessage || defaultMessage;

  return (
    <>
      <title>{`${errorCode}: ${message}`}</title>
      <div style={styles.error}>
        <React.Fragment>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}",
            }}
          />
          <div className="display:flex;">
            <h1 className="next-error-h1" style={styles.h1}>
              {errorCode}
            </h1>
            <div style={styles.desc}>
              <h2 style={styles.h2}>{message}</h2>
            </div>
            <p className="mt-5 text-xs xs:min-md:text-sm">{messageInfo}</p>
          </div>
        </React.Fragment>
      </div>
    </>
  );
};

export default ErrorPage;
