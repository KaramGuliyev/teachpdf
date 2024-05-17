"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

interface ErrorProps {
  errorCode: number;
  errorMessage: string;
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
    const timeout = setTimeout(() => {
      toast.success("Redirecting to home page...");
      router.push("/");
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <title>{`${errorCode}: ${errorMessage}`}</title>
      <div style={styles.error}>
        <React.Fragment>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}",
            }}
          />
          <h1 className="next-error-h1" style={styles.h1}>
            {errorCode}
          </h1>
          <div style={styles.desc}>
            <h2 style={styles.h2}>{errorMessage}</h2>
          </div>
        </React.Fragment>
      </div>
    </>
  );
};

export default ErrorPage;
