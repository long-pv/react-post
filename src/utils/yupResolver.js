export const createYupResolver = (schema) => async (values) => {
    try {
        const validatedValues = await schema.validate(values, {
            abortEarly: false,
        });

        return {
            values: validatedValues,
            errors: {},
        };
    } catch (error) {
        const yupErrors = error?.inner || [];

        const errors = yupErrors.reduce((acc, currentError) => {
            if (!currentError.path || acc[currentError.path]) {
                return acc;
            }

            acc[currentError.path] = {
                type: currentError.type ?? 'validation',
                message: currentError.message,
            };

            return acc;
        }, {});

        return {
            values: {},
            errors,
        };
    }
};
