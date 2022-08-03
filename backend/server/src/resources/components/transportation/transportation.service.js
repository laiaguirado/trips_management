const Transportation = require("./transportation.model");
const Travel = require("../../travel/travel.model");
const { runTransaction } = require("../../../helper");
const { errMalformed } = require("../../../errors");

const createTransport = async (transport) => {
  const transportation = await runTransaction(async () => {
    const transportCreated = await Transportation.create(transport);

    const travel = await Travel.findOneAndUpdate(
      { _id: transport.idTravel },
      { $push: { transportation: transportCreated._id } },
      { new: true, useFindAndModify: false, runValidators: true }
    );
    return transportCreated;
  });
  return transportation;
};

const getAllTransportation = async (idTravel) => {
  return await Transportation.find()
    .select({ resourceType: 0 })
    .populate({ path: "idUser", select: "email -_id" })
    .lean()
    .exec();
};

const getTransportationById = async (idTransportation) => {
  const transport = await Transportation.findOne({ _id: idTransportation })
    .select({ resourceType: 0 })
    .populate({ path: "idUser", select: "email -_id" })
    .lean()
    .exec();
  if (transport === null) {
    errMalformed(`Transport with '${idTransportation}' not found`);
  }
  return transport;
};

const deleteTransportation = async (_id) => {
  const transport = await runTransaction(async () => {
    const deleted = await Transportation.findByIdAndDelete({ _id })
      .lean()
      .exec();

    if (deleted === null) {
      errMalformed(`Transport with '${_id}' not found`);
    }
    console.log(deleted.idTravel);
    const travel = await Travel.findOneAndUpdate(
      { _id: deleted.idTravel },
      { $pull: { transportation: _id } },
      { new: true, useFindAndModify: false }
    );

    return deleted;
  });
  return transport;
};

module.exports = {
  createTransport,
  getAllTransportation,
  getTransportationById,
  deleteTransportation,
};
