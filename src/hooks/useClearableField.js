import { useState, useCallback } from "react";

export const useClearableField = (initialValue = "") => {
    const [value, setValue] = useState(initialValue);

    const handleChange = useCallback((event) => {
        setValue(event.target.value);
    }, []);

    const clearField = useCallback(() => {
        setValue("");
    }, []);

    return {
        value,
        onChange: handleChange,
        clearField,
    };
};

export default useClearableField;
