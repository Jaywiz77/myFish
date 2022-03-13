export const Hex = props => {
  const { A, B, side,color = "", ...divProps } = props;

  return (
    <div
      {...divProps}
      className={`hex ${side} ${color} `}
      style={{
        //border: "1px solid #000",
        boxSizing: "border-box",
        height: "100px",
        width: "100px",
        ...props.style,
        position: "relative",
        borderRadius: "100%"
      }}
    >
      <div
        style={{
          borderTop: "1px solid #000",
          borderBottom: "1px solid #000",
          boxSizing: "border-box",
          width: 100 / Math.sqrt(3) + "px",
          height: "100%",
          margin: "0 auto",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          transform: "rotate(90deg)",
        }}
      />
      <div
        style={{
          borderTop: "1px solid #000",
          borderBottom: "1px solid #000",
          boxSizing: "border-box",
          width: 100 / Math.sqrt(3) + "px",
          height: "100%",
          margin: "0 auto",
          transform: "rotate(150deg)",
          transformOrigin: "center center",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          // backgroundImage: `url(${backg})`
          
        }}
      />
      <div
        style={{
          borderTop: "1px solid #000",
          borderBottom: "1px solid #000",
          boxSizing: "border-box",
          width: 100 / Math.sqrt(3) + "px",
          height: "100%",
          margin: "0 auto",
          transform: "rotate(210deg)",
          transformOrigin: "center center",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0
        }}
      />
    </div>
  );
};