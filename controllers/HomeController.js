class HomeController {

    async index(req, res) {
        res.json({ result: "Olá, Mundo!" });
    }

}

module.exports = new HomeController();