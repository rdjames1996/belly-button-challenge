const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Grabbing JSON then console logging it.
d3.json(url).then(function(data) {
    console.log(data);
});

function init() {

    let dropdown = d3.select("#selDataset");

    d3.json(url).then((data) => {

        let names = data.names;

        names.foreach((id) => {

            console.log(id);

            dropdown.append("option")
            .text(id)
            .property("value",id);
        });

        let sample_one = names[0];

        console.log(sample_one);

        metadata(sample_one);
        barchart(sample_one);
        bubblechart(sample_one);
        
    });
};

function metadata(sample) {

    d3.json(url).then((data) => {

        let metadata = data.metadata;

        let info = metadata.filter(result => result.id == sample);

        console.log(info)

        let infodata = info[0];

        d3.select("#sample-metadata").html("");

        Object.entries(infodata).foreach(([key,value]) => {
            console.log(key,value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });
};

function barchart(sample) {

    d3.json(url).then((data) => {

        let sampleinfo = data.samples;

        let value = sampleinfo.filter(result => result.id == sample);

        let infodata = value[0];

        let otu_ids = infodata.otu_ids;
        let otu_labels = infodata.otu_labels;
        let sample_values = infodata.sample_values

        console.log(otu_ids,otu_labels,sample_values);

        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let xticks = sample_values.slice(0,10).reverse();
        let labels = otu_labels.slice(0,10).reverse();

        let trace = {
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        let layout = {
            title: "top 10 OTUs found in the Individual"
        };

        Plotly.newPlot("bar", [trace], layout)
    });
};

