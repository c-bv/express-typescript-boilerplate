const createUser = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    throw new Error('Error');
};

export default {
    createUser,
};