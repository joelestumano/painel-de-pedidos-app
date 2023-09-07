export function ImageGallery({ ...props }) {
    const imageCount = props.images.length;
  const columns = Math.ceil(Math.sqrt(imageCount));

  const molduraStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: "10px"
  };

  return (
    <div className="moldura" style={molduraStyle}>
      {props.images.map((url:string, index: number) => (
        <img className="rounded"
          key={index}
          src={url}
          alt={`Image ${index + 1}`}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "cover"
          }}
        />
      ))}
    </div>
  );
}


