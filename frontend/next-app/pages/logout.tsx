import { useEffect } from 'react';
export default function Logout() {
    useEffect(()=>{
        fetch("/api/logout", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          });
    },[])
    return <div>logout</div>
};
