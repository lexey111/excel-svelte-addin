export type EntityType = 'metric' | 'list' | 'report';

export type DimensionId = string; // Dim.oZ
export type DimensionValue = string; // Dim.oZ.a

export type DimensionLocator = {
	// dimensionId: DimensionId;
	// dimensionValue: DimensionValue;
	id: string;
	name: string;
	value: string | 'all';
};

export type AggregationType = 'year' | 'half_year' | 'quarter' | 'month' | 'week';

export type TimeDimensionLocator = DimensionLocator & {
	aggregate?: AggregationType;
};

export type Source = {
	id: string;
	version: string;
	entityName: string;
	entityType: EntityType;
	locators: DimensionLocator[]; // DimensionLocator Product=A, Region=EMEA, Month=July 2025
	cellAddress: string;
};

export type Connection = {
	id?: string;
	name: string;
	bookName?: string;
	sheetNumber?: number;
	sheetTitle?: string;
	sources: Source[];
};

export type ConnectionsStore = {
	isLoading: boolean;
	isError: boolean;
	data: Connection[];
};
