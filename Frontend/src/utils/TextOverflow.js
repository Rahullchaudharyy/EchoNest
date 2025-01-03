const truncateText = (text, limit) => {
    const words = text.split(" ");

    return words.length > limit
      ? `${words.slice(0, limit).join(" ")}... read more`
      : text;
  };



  export {truncateText}