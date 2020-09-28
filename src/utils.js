const UTILS = {
    getUserData: uid => {
        return fetch(`https://game-server.kovalevskyi.net/init?uid=${uid}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Could not reach website.");
                }
                return response.json();
            })
            .catch(err => console.error(err));
    },

    getSpinResult: (uid, currnetBet) => {
        return fetch(`https://game-server.kovalevskyi.net/spin?uid=${uid}&bet=${currnetBet}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Could not reach website.");
                }
                return response.json();
            })
            .catch(err => console.error(err));
    }
}