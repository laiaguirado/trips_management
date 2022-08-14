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

const getAllTransportationByTravel = async (idTravel) => {
  return await Transportation.find({ idTravel })
    .select({ resourceType: 0 })
    .populate({ path: "idUser", select: "email id" })
    .populate({ path: "idTravel", select: "name" })
    .lean({ getters: true, virtuals: true })
    .exec();
};

const getTransportationById = async (idTransportation) => {
  const transport = await Transportation.findOne({ _id: idTransportation })
    .select({ resourceType: 0 })
    .populate({ path: "idUser", select: "email id" })
    .populate({ path: "idTravel", select: "name" })
    .lean({ getters: true, virtuals: true })
    .exec();

  if (transport === null) {
    errMalformed(`Transport not found`);
  }
  return transport;
};

const getOne = async (_id) => {
  const transp = await Transportation.findOne({ _id });

  if (transp === null) {
    errMalformed(`Transport with id '${_id}' not found`);
  }
  return transp;
};

const deleteTransportation = async (_id) => {
  const transport = await runTransaction(async () => {
    const deleted = await Transportation.findByIdAndDelete({ _id })
      .lean()
      .exec();

    if (deleted === null) {
      errMalformed(`Transport not found`);
    }

    const travel = await Travel.findOneAndUpdate(
      { _id: deleted.idTravel },
      { $pull: { transportation: _id } },
      { new: true, useFindAndModify: false }
    );

    return deleted;
  });
  return transport;
};

const updateTransportation = async (_id, transportInfo) => {
  const transportationUpdated = await Transportation.findOneAndUpdate(
    { _id },
    transportInfo,
    { new: true }
  )
    .lean()
    .exec();

  if (transportationUpdated === null) {
    errMalformed(`Transportation not found`);
  }
  return transportationUpdated;
};

module.exports = {
  createTransport,
  getAllTransportationByTravel,
  getTransportationById,
  deleteTransportation,
  updateTransportation,
  getOne
};
