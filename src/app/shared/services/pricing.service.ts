
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Apollo } from 'apollo-angular';
import graphqlTag from 'graphql-tag';

import { Pricing } from './../models/pricing.model';

@Injectable()
export class PricingService {

  private pricing: Pricing

  constructor(private apollo: Apollo) { }

  getPricings(): Observable<any> {
    const getPricings = graphqlTag`query {
      getPricings {
        _id
        treatment {
          _id
          description
        }
        insurance {
          _id
          name
        }
        price
      }
    }`;

    return this.apollo.query({
      query: getPricings
    })
  }

  createPricing(pricing: Pricing): Observable<any> {
    const mutation = graphqlTag`mutation(
      $treatment: String!,
      $insurance: String!,
      $price: Number!
    ) {
        createPricing(
          treatment: $treatment,
          insurance: $insurance,
          price: $price
        ) {
          _id
          treatment {
            _id
            description
          }
          insurance {
            _id
            name
          }
          price
        }
      }`;
    return this.apollo.mutate({
      mutation: mutation,
      variables: {
        treatment: pricing.treatment,
        insurance: pricing.insurance,
        price: pricing.price
      }
    })
  }

  updatePricing(pricing: Pricing): Observable<any> {
    const mutation = graphqlTag`mutation(
      $_id: String!,
      $treatment: String!,
      $insurance: String!,
      $price: Number!
    ) {
        updatePricing(
          _id: $id,
          treatment: $treatment,
          insurance: $insurance,
          price: $price
        ) {
          _id
          treatment {
            _id
            description
          }
          insurance {
            _id
            name
          }
          price
        }
      }`;
    return this.apollo.mutate({
      mutation: mutation,
      variables: {
        _id: pricing._id,
        treatment: pricing.treatment,
        insurance: pricing.insurance,
        price: pricing.price
      }
    })
  }

}
