import packageJSON from '../../package.json';
const config = {
    version: packageJSON.version
};

export default function handler(req, res) {
  res.status(200).json(config);
}