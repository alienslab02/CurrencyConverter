const ApiBaseUrl = 'http://api.fixer.io/latest';

type TApiData = {
	base: string,
	success: Function,
	error: Function,
};

const getConversionRates = (data: TApiData) => {
	const url = `${ApiBaseUrl}?base=${data.base}`;
	fetch(url)
    .then((response) => response.json())
    .then(data.success)
    .catch(data.error);
};

const ApiHelper = {
	getConversionRates,
};

export default ApiHelper;