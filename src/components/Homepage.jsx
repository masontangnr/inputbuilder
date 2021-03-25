import React, { useState, useRef } from "react";
import { CSVReader } from "react-papaparse";

const Homepage = () => {
	const data = { search: "", variable: "" };

	const [infos, setInfos] = useState("");
	const [search, setSearch] = useState(data);
	const [displayTraits, setDisplayTraits] = useState("");
	const [copy, setCopy] = useState(false)
	const buttonRef = React.createRef();

	const handleInputChange = (event) => {
		const { name, value } = event.target;

		setSearch({ ...search, [name]: value });
	};

	const handleOpenDialog = (e) => {
		if (buttonRef.current) {
			buttonRef.current.open(e);
		}
	};

	const handleOnFileLoad = (data) => {
		if (data) {
			setInfos(data);
			console.log(data);
		}
	};

	const handleOnError = (err, file, inputElem, reason) => {
		console.log(err);
	};

	const handleOnRemoveFile = (data) => {
		console.log(data);
	};

	const handleRemoveFile = (e) => {
		// Note that the ref is set async, so it might be null at some point
		if (buttonRef.current) {
			buttonRef.current.removeFile(e);
		}
	};

	//issue is the span. Try it without the span and get in object. Try json.stringify
	const information = () => {
		if (infos) {
			console.log(infos);
			const key = infos[0].data.map((str) => str.replace(/\s/g, ""));
			

			const zipcodeInfo = [];

			
				for (let i = 1; i < infos.length - 1; i++) {
					const item = infos[i].data;
          const id = item[0]
          const companyName = item[1]

					if (i - 1) {
						zipcodeInfo.push(
              "{" + "id: " + '"' + id + '"' +  ", " + "provider: " + '"' + companyName + '"' + "}" + "," + " "
						);
					} else if (i) {
						zipcodeInfo.unshift(
							"{" + "id: " + '"' + id + '"' +  ", " + "provider: " + '"' + companyName + '"' + "}" + "," + " "
						);
					}
				}
				console.log(zipcodeInfo);
				return zipcodeInfo;
		
		}
		return "Upload CSV files, type in the column name, and type in the variable to see adobe rules";
	};

	console.log(information());

	return (
		<>
			<h3 className='mt-2 d-flex justify-content-center'>
				Adobe Audience Manager Trait Rule Builder
			</h3>
			<h5 className='mt-5'>1. Upload CSV File</h5>
			<CSVReader
				ref={buttonRef}
				onFileLoad={handleOnFileLoad}
				onError={handleOnError}
				noClick
				noDrag
				onRemoveFile={handleOnRemoveFile}
			>
				{({ file }) => (
					<aside
						style={{
							display: "flex",
							flexDirection: "row",
							marginBottom: 10,
						}}
					>
						<button
							type='button'
							onClick={handleOpenDialog}
							style={{
								borderRadius: 5,
								marginLeft: 0,
								marginRight: 0,
								paddingLeft: 20,
								paddingRight: 20,
								border: "1px solid #008000",
								"background-color": "#008000",
								color: "white",
								height: "40px",
								width: "157px",
							}}
						>
							Upload CSV File
						</button>
						<div
							style={{
								borderWidth: 1,
								borderStyle: "solid",
								borderColor: "#ccc",
								height: 40,
								lineHeight: 2.5,
								marginTop: 0,
								marginBottom: 5,
								paddingLeft: 13,
								paddingBottom: 5,
								width: "179px",
								marginLeft: 9,
								marginRight: 9,
							}}
						>
							{file && file.name}
						</div>
						<button
							style={{
								borderRadius: 5,
								marginLeft: 0,
								marginRight: 0,
								paddingLeft: 20,
								paddingRight: 20,
								border: "1px solid #ff3300",
								"background-color": "#ff3300",
								color: "white",
								height: "40px",
								width: "170px",
							}}
							onClick={handleRemoveFile}
						>
							Remove CSV File
						</button>
					</aside>
				)}
			</CSVReader>
			{/* <h5 className='mt-5'>2. Type in the column name you want to read</h5>
			<input
				type='text'
				name='search'
				placeholder='Name of column'
				value={search.search}
				onChange={handleInputChange}
				style={{
					height: "45px",
					"border-radius": "4px",
					padding: "4px",
					width: "200px",
				}}
			/> */}
			{/* <h5 className='mt-5'>
				3. Type in the variable to generate Adobe Audience rules
			</h5>
			<input
				type='text'
				name='variable'
				placeholder='Name of variable'
				value={search.variable}
				onChange={handleInputChange}
				style={{
					height: "45px",
					"border-radius": "4px",
					padding: "4px",
					width: "200px",
				}}
			/> */}
			<div>
				<br />
				<button
					onClick={() => setDisplayTraits(true)}
					onClass='btn btn-primary'
					style={{
						borderRadius: 5,
						marginLeft: 0,
						marginRight: 0,
						paddingLeft: 20,
						paddingRight: 20,
						border: "1px solid #0071A1",
						"background-color": "#0071A1",
						color: "white",
						height: "40px",
						width: "157px",
					}}
				>
					Build Traits
				</button>
				<h5 className='mt-5'>Adobe Audience Rules</h5>
				{information() ===
				"Upload CSV files, type in the column name, and type in the variable to see adobe rules" ? (
					<> </>
				) : (
					<>
					<button
						onClick={() => {
							navigator.clipboard.writeText("[" + information().join("") + "]");
							setCopy(true);
						}}
						className='mb-3'
					>
						Copy to Clipboard
					</button>
					{copy ? <span className='ml-3'>Clipboard copied!</span> : <></>}
					<br></br>
					</>
				)}

			
				{displayTraits ? (
					<div>{information()}</div>
				) : (
					"Upload CSV files, type in the column name, and type in the variable to see adobe rules"
				)}
			</div>
		</>
	);
};

export default Homepage;
