module.exports = fn => {
    return (req, res, next) => {
        // Fonksiyonu çalıştır, eğer hata (catch) verirse doğrudan 'next' ile hata merkezine yolla!
        fn(req, res, next).catch(next);
    };
};