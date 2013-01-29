//JSON data containing starting points and ranges


var JSONData = {
	Assaults: [
		{offenceName: "GBH with intent",
		colour: "#0072c1",
		offencesRanges: [
			{bottom: 9,
			startingpoint: 12,
			top: 16
			},
			{bottom: 5,
			startingpoint: 6,
			top: 9
			},
			{bottom: 3,
			startingpoint: 4,
			top: 5
			}
			]
		},
		{offenceName: "GBH",
		colour: "#0072c1",
		offencesRanges: [
			{bottom: 2.5,
			startingpoint: 3,
			top: 4
			},
			{bottom: 1,
			startingpoint: 1.5,
			top: 3
			},
			{bottom: "Community Order",
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
		}
	]
	,
	Burglary: 
	[{
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
		{bottom: 2,
		startingpoint: 3,
		top: 6
		},
		{bottom: "Community Order",
		startingpoint: 1,
		top: 2
		},
		{bottom: "Community Order",
		startingpoint: "Community Order",
		top: 0.5
		}
	
		]
	},
	{offenceName: "Non-domestic burglary",
	colour: "#4AAB2E",
	offencesRanges: [
		{bottom: 1,
		startingpoint: 2,
		top: 5
		},
		{bottom: "Community Order",
		startingpoint: 18/52,
		top: 51/52
		},
		{bottom: "Fine",
		startingpoint: "Community Order",
		top: 18/52
		}
	
		]
	}
	]
};

