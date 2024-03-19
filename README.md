# Commercetools Connect

The `connect.yaml` file defines the variables for every package and the type.

## To add a new Package: 

1. make a new folder like "review-mc-app" and develop a application inside the folder.
2. add the package to the `connect.yaml` file

## Deployment of a new Version

1. Tag the commit to deploy and create a gh release with this commit. 
2. Update the tag of the Connector in the merchant center (My Profile > Organizations > zyres > Connect > Manage Connectors > Review Application > Repository Tag) / api (view docs) and republish. **This will only update the connector itself and not any installation of this connector.**
3. Update the Installation of the Connector either remove the old installation in the Merchant Center (My Profile > Organizations > zyres > Connect > Manage Connectors > Installations > Review Application) or use the API to redeploy and update the Connector with the following POST reqest:
```
curl --location --request POST 'https://connect.europe-west1.gcp.commercetools.com/zyrestestpro01/deployments/<deployment-id>' \
--header 'Authorization: Bearer <access-token>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "version": <version>,
    "actions": [
        {
            "action": "redeploy",
            "updateConnector": true
        }
    ]
}'
```
