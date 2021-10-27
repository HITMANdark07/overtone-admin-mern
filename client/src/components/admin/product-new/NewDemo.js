import React, { useState, useEffect } from "react";

export default function NewDemo() {
  const [name, setName] = useState("");

  useEffect(() => {
    setName(() => "name");
    console.log(name);
  }, []);
  console.log(name);

  return <div>hello</div>;
}
