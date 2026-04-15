using System;
using System.Collections.Generic;
using System.Text;

namespace FacadePattern
{
    public class IceCreamFacade
    {
        private FlavourService _flavorService;
        private ConeService _coneService;
        private PaymentService _paymentService;

        public IceCreamFacade()
        {
            _flavorService = new FlavourService();
            _coneService = new ConeService();
            _paymentService = new PaymentService();
        }

        public string GetIceCream()
        {
            Console.WriteLine("Mother is arranging the ice cream...");

            string flavor = _flavorService.GetFlavour();
            string cone = _coneService.GetCone();

            _paymentService.ProcessPayment();

            return flavor + " in a " + cone;
        }
    }
}