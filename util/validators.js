module.exports.validateRegisterInput = (
	username,
	password,
	confirmPassword
) => {
	const errors = {};
	if (username.trim() === "") {
		errors.username = "Username must not be empty!";
	}
	if (password === "") {
		errors.password = "Password must not be empty!";
	} else if (confirmPassword !== password) {
		errors.confirmPassword = "Password must match!";
	}

	return {
		errors,
		valid: Object.keys(errors).length < 1,
	};
};

module.exports.validateLoginInput = (username, password) => {
	const errors = {};
	if (username.trim() === "") {
		errors.username = "Username must not be empty!";
	}
	if (password === "") {
		errors.password = "Password must not be empty!";
	}

	return {
		errors,
		valid: Object.keys(errors).length < 1,
	};
};

module.exports.validatePlanInput = (
	initial_Investment,
	interest_rate,
	years_length,
	cash_rate,
	monthly_contribution
) => {
	const errors = {};

	if (isNaN(initial_Investment) || initial_Investment <= 0) {
		errors.initial_Investment =
			"Initial Investment must be a number and bigger than 0";
	}

	if (isNaN(interest_rate) || interest_rate <= 0 || interest_rate > 100) {
		errors.interest_rate =
			"Interest rate must be a number and between 0.1 and 100 ";
	}

	if (isNaN(years_length) || years_length <= 0 || years_length > 100) {
		errors.years_length =
			"Length in years must be a number and bigger than 0 but not larger than 100";
	}

	if (isNaN(cash_rate) || cash_rate < 0 || cash_rate > 100) {
		errors.cash_rate =
			"Cash out rate must be a number not smaller that 0 and not bigger than 100";
	}

	if (isNaN(monthly_contribution) || monthly_contribution < 0) {
		errors.monthly_contribution =
			"Monthly contribution must be a number bigger than 0";
	}

	return {
		errors,
		valid: Object.keys(errors).length < 1,
	};
};
