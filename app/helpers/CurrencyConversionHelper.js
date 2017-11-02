import ApiHelper from './ApiHelper';

export type TData = {
	from: string,
	to: string,
	value: number,
};

const convert = (data: TData, onSuccess: Function, onError: Function) => {
	ApiHelper.getConversionRates({
		base: data.from,
		success: (response) => {
			// check if response is valid
			if (response.error) {
				onError(response.error);
				return;
			}

			const converstionRate = response.rates[data.to];
			if (converstionRate > 0){
				onSuccess(converstionRate * data.value);
				return;
			}

			return onError('Invalid target currency');
		},
		error: onError,
	});
};

const CurrencyConversionHelper = {
	convert,
};

export default CurrencyConversionHelper;