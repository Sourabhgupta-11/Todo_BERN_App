import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";  

export default buildModule("TodoModule", (m) => {  
  const todoContract = m.contract("TodoApp");  
  return { todoContract };
});

//0xc27bE5Ea8f0D35A1Ab5cb2594c3FF97a05CcA904