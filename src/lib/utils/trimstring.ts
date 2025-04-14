const trimWhiteSpaces = (values: FormValues): FormValues => {
    const trimmedValues = Object.fromEntries(
        Object.entries(values).map(([key, value]) => [
            key,
            typeof value === 'string' ? value.trim() : value
        ])) as FormValues
    return trimmedValues;
}
export default trimWhiteSpaces;