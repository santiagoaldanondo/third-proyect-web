
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import graphqlTag from 'graphql-tag';

import { Pricing } from './../models/pricing.model';

@Injectable()
export class PricingService {

  private pricing: Pricing

  constructor(private apollo: Apollo) { }

  getPricings(): ApolloQueryObservable<any> {
    const getPricings = graphqlTag`query getPricings{
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

    return this.apollo.watchQuery({
      query: getPricings
    })
  }

  createPricing(pricing: Pricing): Observable<any> {
    const mutation = graphqlTag`mutation createPricing(
      $treatment: ID!,
      $insurance: ID!,
      $price: Float!
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
      },
      optimisticResponse: {
        __typename: 'Mutation',
        createPricing: {
          __typename: 'Pricing',
          _id: null,
          treatment: pricing.treatment,
          insurance: pricing.insurance,
          price: pricing.price
        },
      },
      updateQueries: {
        getPricings: (prev, { mutationResult }) => {
          console.log(mutationResult)
          const newPricing: Pricing = mutationResult.data.createPricing;
          const prevPricings: Array<Pricing> = prev.getPricings;
          prevPricings.push(newPricing)
          return { getPricings: prevPricings }
        },
      },
    })
  }

  updatePricing(pricing: Pricing): Observable<any> {
    const mutation = graphqlTag`mutation updatePricing(
      $_id: String!,
      $treatment: ID!,
      $insurance: ID!,
      $price: Float!
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
