class util {
    static regexp(data) {
        const regex = new RegExp(/\d{4}-\d{2}-\d{2}/);

        const result = regex.test(data);

        if (result === true) {
            return true;
        } else {
            return false;
        }
    }
}

export { util };
