class BinaryEnsemble{
    constructor(){
        this.dataset = [];
        this.models = {};
        this.bestCombination = [];
        this.bestAccuracy = 0;
        this.totalIterations = 0;
    }

    generateRandomModels(modelCount=10, observationCount=10){
        this.generateDataset(observationCount);
        for(let model=0 ; model<modelCount; model++){
            this.models[model] = [];
            for(let count=0; count<observationCount; count++){
                this.models[model].push(Math.round(Math.random()));
            }
        }
        console.log(this.models);
    }

    generateDataset(observationCount){
        for(let count=0; count<observationCount; count++){
            this.dataset.push(Math.round(Math.random()));
        }
        console.log(this.dataset);
    }

    ensemble(min=1, max=Object.keys(this.models).length, maxIterations=100){
        let iterations = 0;

        // No. of iterations required to create the ensemble
        while(iterations < maxIterations){
            // console.log("--------------------");
            let predicted = []; // predicted values of the model combination
            let rand = 0; // total number of models combination
            while(rand%2==0) rand = Math.round(Math.random()*10);
            // console.log("RAND: " + rand); // ALways an odd number
            let set = new Set(); // Create a combination set of models
            while(Array.from(set).length < rand){
                set.add(Math.round(Math.random()*9));
            }
            // console.log("SET Length: " + Array.from(set).length);
            // console.log("SET: " + Array.from(set));

            // voting - for each observation
            for(let count=0; count<this.dataset.length; count++){
                let vote = 0;
                const voteArray = Array.from(set);
                for(let i=0; i < voteArray.length; i++){
                    vote = (this.models[voteArray[i]][count] === 1) ? vote + 1 : vote;
                }
                // console.log("VOTE: " + vote);
                if(vote < rand - vote) predicted.push(0)
                else predicted.push(1);
            }

            //accuracy check
            let total = 0;
            for(let i=0; i < this.dataset.length; i++){
                if(this.dataset[i] === predicted[i]) total++;
            }
            const accuracy = total/this.dataset.length*100;
            if(accuracy > this.bestAccuracy){
                this.bestAccuracy = accuracy;
                this.bestCombination = Array.from(set);
            }
            // console.log("Dataset: " + this.dataset);
            // console.log("Predicted: " + predicted);
            // console.log("Accuracy: " + accuracy);
            this.totalIterations++;
            iterations++;
        }
        console.log("Iterations: " + this.totalIterations);
        console.log("Accuracy: " + this.bestAccuracy);
        console.log("Models: " + this.bestCombination);
    }
}