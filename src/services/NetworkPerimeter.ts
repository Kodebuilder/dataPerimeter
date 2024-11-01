import { VPCClient, DescribeVpcEndpointsCommand } from "@aws-sdk/client-vpc";

export class NetworkPerimeter {
  private vpcClient: VPCClient;

  constructor(region: string) {
    this.vpcClient = new VPCClient({ region });
  }

  async validateNetworkControls(vpcId: string): Promise<boolean> {
    try {
      // Validate VPC endpoints
      const command = new DescribeVpcEndpointsCommand({
        Filters: [
          {
            Name: 'vpc-id',
            Values: [vpcId]
          }
        ]
      });

      const response = await this.vpcClient.send(command);
      
      return this.validateEndpoints(response.VpcEndpoints || []);
    } catch (error) {
      console.error('Error validating network controls:', error);
      return false;
    }
  }

  private validateEndpoints(endpoints: any[]): boolean {
    const requiredServices = [
      'com.amazonaws.region.s3',
      'com.amazonaws.region.security-lake'
    ];

    return requiredServices.every(service => 
      endpoints.some(endpoint => 
        endpoint.ServiceName === service && 
        endpoint.State === 'available'
      )
    );
  }
}