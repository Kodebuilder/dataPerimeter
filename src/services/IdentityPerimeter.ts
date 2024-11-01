import { IAMClient, GetRoleCommand, AttachRolePolicyCommand } from "@aws-sdk/client-iam";

export class IdentityPerimeter {
  private iamClient: IAMClient;

  constructor(region: string) {
    this.iamClient = new IAMClient({ region });
  }

  async validateIdentityBoundaries(roleName: string): Promise<boolean> {
    try {
      const command = new GetRoleCommand({ RoleName: roleName });
      const response = await this.iamClient.send(command);
      
      // Validate permission boundaries
      const hasBoundary = response.Role?.PermissionsBoundary !== undefined;
      
      // Check for required policies
      const requiredPolicies = [
        'arn:aws:iam::aws:policy/SecurityAudit',
        'arn:aws:iam::aws:policy/service-role/AWSSecurityLakeServiceRole'
      ];

      return hasBoundary && this.validatePolicies(roleName, requiredPolicies);
    } catch (error) {
      console.error('Error validating identity boundaries:', error);
      return false;
    }
  }

  private async validatePolicies(roleName: string, requiredPolicies: string[]): Promise<boolean> {
    for (const policy of requiredPolicies) {
      try {
        await this.iamClient.send(new AttachRolePolicyCommand({
          RoleName: roleName,
          PolicyArn: policy
        }));
      } catch (error) {
        console.error(`Error attaching policy ${policy}:`, error);
        return false;
      }
    }
    return true;
  }
}