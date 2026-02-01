# Node.js'in güncel ve hafif sürümünü kullanıyoruz
FROM node:24-slim

# Uygulama klasörünü oluştur
WORKDIR /usr/src/app

# Sadece paket listelerini kopyala (Hızlı build için)
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Tüm kodu kopyala
COPY . .

# Portu dışarı aç
EXPOSE 3000

# Uygulamayı başlat
CMD ["npm", "run", "dev"]