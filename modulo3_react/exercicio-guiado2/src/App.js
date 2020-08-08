import React, { Component } from "react";
import Countries from "./components/countries/Countries";
import Header from "./components/header/Header";

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            allCountries: [],
            filteredCountries: [],
            filter: "",
            filteredPopulation: 0
        };
    }

    async componentDidMount() {
        const res = await fetch("https://restcountries.eu/rest/v2/all");
        const json = await res.json();

        const allCountries = json.map(
            ({ name, numericCode, flag, population }) => {
                return {
                    id: numericCode,
                    name,
                    flag,
                    population,
                };
            }
        );

        const filteredPopulation = allCountries.reduce((acc, curr) => acc + curr.population, 0);

        this.setState({
            allCountries,
            filteredCountries: Object.assign([], allCountries),
            filteredPopulation
        });
    }

    handleChangeFilter = (newFilter) =>{
        this.setState({
            filter: newFilter
        });

        const filteredCountries = this.state.allCountries.filter(country => {
            return country.name.toLowerCase().includes(newFilter.toLowerCase());
        });

        const filteredPopulation = filteredCountries.reduce((acc, curr) => acc + curr.population, 0);

        this.setState({
            filteredCountries,
            filteredPopulation
        });
    };

    render() {
        const { filteredCountries, filter, filteredPopulation } = this.state;

        return (
            <div className="container">
                <h1 style={styles.centeredTitle}>React Countries</h1>
                <Header 
                    filter={filter} 
                    totalPopulation={filteredPopulation}
                    countryCount={filteredCountries.length} 
                    onChangeFilter={this.handleChangeFilter} />
                <Countries countries={filteredCountries} />
            </div>
        );
    }
}

const styles = {
    centeredTitle: {
        textAlign: "center"
    }
};