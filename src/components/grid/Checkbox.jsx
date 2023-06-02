import React, { useEffect } from "react";

const Checkbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input className="" type="checkbox" ref={resolvedRef} {...rest} />
    </>
  );
});
export default Checkbox;
