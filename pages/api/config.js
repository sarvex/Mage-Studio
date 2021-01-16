import packageJSON from '../../package.json';
const config = {
    version: packageJSON.version
};

const handler = (req, res) => {
  res.status(200).json(config);
}

export default handler;