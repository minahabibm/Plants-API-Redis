#Specify a base image
FROM node:alpine

# Verification API port
EXPOSE 7000

#Specify a working directory
WORKDIR /usr/app

#Copy remaining files
COPY ./ ./

#Install dependencies
RUN npm install 

#Default command
CMD ["npm","start"]