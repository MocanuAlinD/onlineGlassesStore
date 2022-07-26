import React from "react";

const Empty = () => {
  return (
    <div className="container">
      <h1>ONLINE DEMO STORE</h1>
      <style jsx>
        {`
            .container{
                width: 100%;
                height: 79vh;
                color: white;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .container h1{
              font-family: Poppins;
            }
                `}
      </style>
    </div>
  );
};

export default Empty;
