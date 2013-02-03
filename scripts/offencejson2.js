//JSON data containing starting points and ranges


var JSONData = [
	
	{offenceName: "GBH with intent",
	colour: "#0072c1",
		offencesRanges: [
		{name: "Category 1",
		bottom: 9,
		startingpoint: 12,
		top: 16
		},
		{name: "Category 2",
		bottom: 5,
		startingpoint: 6,
		top: 9
		},
		{
		name: "Category 3",bottom: 3,
		startingpoint: 4,
		top: 5
		}
		]
	},
	{offenceName: "GBH",
	colour: "#0072c1",
	offencesRanges: [
		{name: "Category 1",
		bottom: 2.5,
		startingpoint: 3,
		top: 4
		},
		{
		name: "Category 2",
		bottom: 1,
		startingpoint: 1.5,
		top: 3
		},
		{name: "Category 3",
		bottom: "Community Order",
		startingpoint: "Community Order",
		top: 51/52
		}
		]
	},
	{offenceName: "ABH",
	colour: "#0072c1",
	offencesRanges: [
		{
		name: "Category 1",
		bottom: 1,
		startingpoint: 1.5,
		top: 3
		},
		{
		name: "Category 2",
		bottom: "Community Order",
		startingpoint: 0.5,
		top: 51/52
		},
		{
		name: "Category 3",
		bottom: "Fine",
		startingpoint: "Community Order",
		top: "Community Order"
		}
		]
	},
	{offenceName: "Assault with intent to resist arrest",
	colour: "#0072c1",
	offencesRanges: [
		{
		name: "Category 1",
		bottom: 12/52,
		startingpoint: 0.5,
		top: 51/52
		},
		{
		name: "Category 2",
		bottom: "Community Order",
		startingpoint: "Community Order",
		top: "Community Order"
		},
		{
		name: "Category 3",
		bottom: "Fine",
		startingpoint: "Fine",
		top: "Fine"
		}
		]
	},
	{offenceName: "Assault on a police constable in execution of his duty",
	colour: "#0072c1",
	offencesRanges: [
		{
		name: "Category 1",
		bottom: "Community Order",
		startingpoint: 12/52,
		top: 0.5
		},
		{
		name: "Category 2",
		bottom: "Community Order",
		startingpoint: "Community Order",
		top: "Community Order"
		},
		{
		name: "Category 3",
		bottom: "Fine",
		startingpoint: "Fine",
		top: "Fine"
		}
		]
	},
	{offenceName: "Common Assault",
	colour: "#0072c1",
	offencesRanges: [
		{
		name: "Category 1",
		bottom: "Community Order",
		startingpoint: 12/52,
		top: 0.5
		},
		{
		name: "Category 2",
		bottom: "Fine",
		startingpoint: "Community Order",
		top: "Community Order"
		},
		{
		name: "Category 3",
		bottom: "Discharge",
		startingpoint: "Fine",
		top: "Fine"
		}
		]
	},
	{
	offenceName: "Aggravated burglary",
	colour: "#4AAB2E",
	offencesRanges: [
		{
		name: "Category 1",
		bottom: 9,
		startingpoint: 10,
		top: 13
		},
		{
		name: "Category 2",
		bottom: 4,
		startingpoint: 6,
		top: 9
		},
		{
		name: "Category 3",
		bottom: 1,
		startingpoint: 2,
		top: 4
		}
		]
	},
	{offenceName: "Domestic burglary",
	colour: "#4AAB2E",
	offencesRanges: [
		{name: "Category 1",
		bottom: 2,
		startingpoint: 3,
		top: 6
		},
		{name: "Category 2",
		bottom: "Community Order",
		startingpoint: 1,
		top: 2
		},
		{name: "Category 3",
		bottom: "Community Order",
		startingpoint: "Community Order",
		top: 0.5
		}
		]
	},
	{offenceName: "Non-domestic burglary",
	colour: "#4AAB2E",
	offencesRanges: [
		{name: "Category 1",
		bottom: 1,
		startingpoint: 2,
		top: 5
		},
		{name: "Category 2",
		bottom: "Community Order",
		startingpoint: 18/52,
		top: 51/52
		},
		{name: "Category 3",
		bottom: "Fine",
		startingpoint: "Community Order",
		top: 18/52
		}
		]
	},
	{offenceName: "Cultivation of cannabis [Leading role]",
	colour: "#9C0BAC",
	offencesRanges: [
		{
		name: "Leading role category 1",
		bottom: 7,
		startingpoint: 8,
		top: 10
		},
		{
		name: "Leading role category 2",
		bottom: 4.5,
		startingpoint: 6,
		top: 8
		},
		{
		name: "Leading role category 3",
		bottom: 2.5,
		startingpoint: 4,
		top: 5
		},
		{
		name: "Leading role category 4",
		bottom: "Community Order",
		startingpoint: 1,
		top: 3
		}
		]
	},
	{offenceName: "Cultivation of cannabis [Significant role]",
	colour: "#9C0BAC",
	offencesRanges: [
		{
		name: "Significant role category 1",
		bottom: 5,
		startingpoint: 5.5,
		top: 7
		},
		{
		name: "Significant role category 2",
		bottom: 2.5,
		startingpoint: 4,
		top: 5
		},
		{
		name: "Significant role category 3",
		bottom:0.5,
		startingpoint: 1,
		top: 3
		},
		{
		name: "Significant role category 4",
		bottom: "Community Order",
		startingpoint: "Community Order",
		top: 0.5
		}
		]
	},
	{offenceName: "Cultivation of cannabis [Lesser role]",
	colour: "#9C0BAC",
	offencesRanges: [
		{
		name: "Lesser role category 1",
		bottom: 2.5,
		startingpoint: 3,
		top: 5
		},
		{
		name: "Lesser role category 2",
		bottom: 0.5,
		startingpoint: 1,
		top: 3
		},
		{
		name: "Lesser role category 3",
		bottom: "Community Order",
		startingpoint: "Community Order",
		top: 2.5
		},
		{
		name: "Lesser role category 4",
		bottom: "Discharge",
		startingpoint: "Fine",
		top: "Community Order"
		}
		]
	}
];

